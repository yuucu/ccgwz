import type { Result, CLIOptions, BranchInfo } from '../types/index.js';
import {
  validateGitRepository,
  validateZellijRunning,
  validatePaneCount,
} from '../utils/validation.js';
import { promptForBranches, showPlannedWorktrees } from '../cli/prompts.js';
import { GitManager } from './git.js';
import { ZellijManager } from './zellij.js';

export class ProcessOrchestrator {
  private gitManager = new GitManager();
  private zellijManager = new ZellijManager();

  async execute(options: CLIOptions): Promise<Result<void>> {
    try {
      const validationResult = await this.validateEnvironment(options.panes);
      if (!validationResult.success) {
        return validationResult;
      }

      const { gitInfo } = validationResult.data;

      const branches = await this.getBranchesFromUser(options.panes, gitInfo.projectName);
      if (branches.length === 0) {
        return {
          success: false,
          error: 'No branches specified',
        };
      }

      showPlannedWorktrees(branches);

      const worktreeResult = await this.gitManager.createAllWorktrees(branches);
      if (!worktreeResult.success) {
        return {
          success: false,
          error: worktreeResult.error,
        };
      }

      console.log('Creating zellij layout and launching Claude Code...');
      const layoutResult = await this.zellijManager.createPanesWithLayout(
        options.panes,
        worktreeResult.data
      );

      if (!layoutResult.success) {
        return {
          success: false,
          error: layoutResult.error,
        };
      }

      console.log('✓ Successfully created worktrees and launched Claude Code!');
      return { success: true, data: undefined };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: `Unexpected error: ${errorMessage}`,
      };
    }
  }

  private async validateEnvironment(paneCount: number) {
    const paneValidation = validatePaneCount(paneCount);
    if (!paneValidation.success) {
      return paneValidation;
    }

    const gitValidation = await validateGitRepository();
    if (!gitValidation.success) {
      return gitValidation;
    }

    const zellijValidation = await validateZellijRunning();
    if (!zellijValidation.success) {
      return zellijValidation;
    }

    return {
      success: true as const,
      data: {
        gitInfo: gitValidation.data,
        zellijInfo: zellijValidation.data,
      },
    };
  }

  private async getBranchesFromUser(paneCount: number, projectName: string): Promise<BranchInfo[]> {
    const existingBranches = await this.gitManager.listExistingBranches();
    return promptForBranches(paneCount, projectName, existingBranches);
  }
}
