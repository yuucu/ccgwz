import { execa } from 'execa';
import type { Result, WorktreeCreationResult } from '../types/index.js';

export class ZellijManager {
  async createNewTabWithPanes(
    tabName: string,
    paneCount: number,
    worktrees: WorktreeCreationResult[]
  ): Promise<Result<void>> {
    try {
      // Create new tab with project name
      await execa('zellij', ['action', 'new-tab', '--name', tabName]);

      // Now create panes in the new tab
      return this.createPanesWithLayout(paneCount, worktrees);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: `Failed to create new tab: ${errorMessage}`,
      };
    }
  }

  async createPanesWithLayout(
    paneCount: number,
    worktrees: WorktreeCreationResult[]
  ): Promise<Result<void>> {
    try {
      // Launch Claude in current pane first
      const firstResult = await this.launchClaudeInCurrentPane(worktrees[0]!);
      if (!firstResult.success) {
        return firstResult;
      }

      // Create additional panes with Claude
      for (let i = 1; i < paneCount; i++) {
        const direction = i % 2 === 1 ? 'right' : 'down';
        await execa('zellij', ['action', 'new-pane', '-d', direction, '--cwd', worktrees[i]!.worktreePath, '--', 'claude']);
      }

      return { success: true, data: undefined };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: `Failed to create zellij layout: ${errorMessage}`,
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

}
