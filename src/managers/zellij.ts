import { execa } from 'execa';
import type { Result, WorktreeCreationResult } from '../types/index.js';

export class ZellijManager {
  async createPanesWithLayout(
    paneCount: number,
    worktrees: WorktreeCreationResult[]
  ): Promise<Result<void>> {
    try {
      if (paneCount === 1) {
        return this.launchClaudeInCurrentPane(worktrees[0]!);
      }

      if (paneCount === 2) {
        return this.create2PaneLayout(worktrees);
      }

      if (paneCount === 3) {
        return this.create3PaneLayout(worktrees);
      }

      if (paneCount === 4) {
        return this.create4PaneLayout(worktrees);
      }

      return this.createGenericLayout(paneCount, worktrees);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: `Failed to create zellij layout: ${errorMessage}`,
      };
    }
  }

  private async create2PaneLayout(worktrees: WorktreeCreationResult[]): Promise<Result<void>> {
    try {
      await execa('zellij', ['action', 'new-pane', '-d', 'right']);

      await this.launchClaudeInPane(worktrees[0]!);

      await execa('zellij', ['action', 'move-focus', 'right']);
      await this.launchClaudeInPane(worktrees[1]!);

      return { success: true, data: undefined };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: `Failed to create 2-pane layout: ${errorMessage}`,
      };
    }
  }

  private async create3PaneLayout(worktrees: WorktreeCreationResult[]): Promise<Result<void>> {
    try {
      await execa('zellij', ['action', 'new-pane', '-d', 'right']);
      await execa('zellij', ['action', 'new-pane', '-d', 'down']);

      await this.launchClaudeInPane(worktrees[0]!);

      await execa('zellij', ['action', 'move-focus', 'right']);
      await this.launchClaudeInPane(worktrees[1]!);

      await execa('zellij', ['action', 'move-focus', 'down']);
      await this.launchClaudeInPane(worktrees[2]!);

      return { success: true, data: undefined };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: `Failed to create 3-pane layout: ${errorMessage}`,
      };
    }
  }

  private async create4PaneLayout(worktrees: WorktreeCreationResult[]): Promise<Result<void>> {
    try {
      await execa('zellij', ['action', 'new-pane', '-d', 'right']);
      await execa('zellij', ['action', 'new-pane', '-d', 'down']);
      await execa('zellij', ['action', 'move-focus', 'up']);
      await execa('zellij', ['action', 'new-pane', '-d', 'down']);

      await this.launchClaudeInPane(worktrees[0]!);

      await execa('zellij', ['action', 'move-focus', 'right']);
      await this.launchClaudeInPane(worktrees[1]!);

      await execa('zellij', ['action', 'move-focus', 'down']);
      await this.launchClaudeInPane(worktrees[2]!);

      await execa('zellij', ['action', 'move-focus', 'left']);
      await this.launchClaudeInPane(worktrees[3]!);

      return { success: true, data: undefined };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: `Failed to create 4-pane layout: ${errorMessage}`,
      };
    }
  }

  private async createGenericLayout(
    paneCount: number,
    worktrees: WorktreeCreationResult[]
  ): Promise<Result<void>> {
    try {
      for (let i = 1; i < paneCount; i++) {
        const direction = i % 2 === 1 ? 'right' : 'down';
        await execa('zellij', ['action', 'new-pane', '-d', direction]);
      }

      for (let i = 0; i < Math.min(paneCount, worktrees.length); i++) {
        if (i > 0) {
          const direction = i % 2 === 1 ? 'right' : 'down';
          await execa('zellij', ['action', 'move-focus', direction]);
        }

        await this.launchClaudeInPane(worktrees[i]!);
      }

      return { success: true, data: undefined };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: `Failed to create generic layout: ${errorMessage}`,
      };
    }
  }

  private async launchClaudeInCurrentPane(worktree: WorktreeCreationResult): Promise<Result<void>> {
    try {
      await execa('zellij', ['run', '--cwd', worktree.worktreePath, '--', 'claude']);

      return { success: true, data: undefined };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: `Failed to launch Claude Code: ${errorMessage}`,
      };
    }
  }

  private async launchClaudeInPane(worktree: WorktreeCreationResult): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    await execa('zellij', ['run', '--cwd', worktree.worktreePath, '--', 'claude']);
  }
}
