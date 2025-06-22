import { execa } from 'execa';
import { existsSync } from 'node:fs';
import type { Result, BranchInfo, WorktreeCreationResult } from '../types/index.js';
import { ERROR_MESSAGES } from '../utils/constants.js';

export class GitManager {
  async createWorktree(branch: BranchInfo): Promise<Result<WorktreeCreationResult>> {
    try {
      if (existsSync(branch.worktreePath)) {
        return {
          success: false,
          error: `${ERROR_MESSAGES.WORKTREE_EXISTS}: ${branch.worktreePath}`,
        };
      }

      await execa('git', ['worktree', 'add', branch.worktreePath, '-b', branch.sanitizedName]);

      return {
        success: true,
        data: {
          branchName: branch.sanitizedName,
          worktreePath: branch.worktreePath,
          created: true,
        },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: `Failed to create worktree: ${errorMessage}`,
      };
    }
  }

  async createAllWorktrees(branches: BranchInfo[]): Promise<Result<WorktreeCreationResult[]>> {
    const results: WorktreeCreationResult[] = [];
    const errors: string[] = [];

    for (const branch of branches) {
      const result = await this.createWorktree(branch);

      if (result.success) {
        results.push(result.data);
        console.log(`✓ Created worktree: ${branch.worktreePath}`);
      } else {
        errors.push(`${branch.sanitizedName}: ${result.error}`);
        console.error(`✗ Failed to create worktree: ${result.error}`);
      }
    }

    if (errors.length > 0) {
      await this.cleanupPartialWorktrees(results);
      return {
        success: false,
        error: `Failed to create worktrees:\n${errors.join('\n')}`,
      };
    }

    return {
      success: true,
      data: results,
    };
  }

  async listExistingBranches(): Promise<string[]> {
    try {
      const { stdout } = await execa('git', ['branch', '--list', '--format=%(refname:short)']);
      return stdout.split('\n').filter((line) => line.trim().length > 0);
    } catch {
      return [];
    }
  }

  private async cleanupPartialWorktrees(createdWorktrees: WorktreeCreationResult[]): Promise<void> {
    console.log('Cleaning up partially created worktrees...');

    for (const worktree of createdWorktrees) {
      try {
        await execa('git', ['worktree', 'remove', worktree.worktreePath, '--force']);
        console.log(`Cleaned up: ${worktree.worktreePath}`);
      } catch (error) {
        console.error(`Failed to cleanup ${worktree.worktreePath}:`, error);
      }
    }
  }
}
