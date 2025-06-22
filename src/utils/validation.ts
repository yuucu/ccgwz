import { execa } from 'execa';
import type { Result, GitInfo, ZellijInfo } from '../types/index.js';
import { ERROR_MESSAGES, GIT_COMMANDS, ZELLIJ_COMMANDS } from './constants.js';

export async function validateGitRepository(): Promise<Result<GitInfo>> {
  try {
    await execa('git', ['rev-parse', '--is-inside-work-tree']);

    const projectName = await getProjectName();
    const currentBranch = await getCurrentBranch();

    return {
      success: true,
      data: {
        isRepository: true,
        projectName,
        currentBranch,
      },
    };
  } catch {
    return {
      success: false,
      error: ERROR_MESSAGES.NOT_GIT_REPO,
    };
  }
}

export async function validateZellijRunning(): Promise<Result<ZellijInfo>> {
  try {
    const { stdout } = await execa('zellij', ['list-sessions']);
    const sessions = stdout
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .filter((line) => !line.includes('No active zellij sessions'));

    return {
      success: true,
      data: {
        isRunning: true,
        sessions,
      },
    };
  } catch {
    return {
      success: false,
      error: ERROR_MESSAGES.ZELLIJ_NOT_RUNNING,
    };
  }
}

export function validatePaneCount(count: number): Result<number> {
  if (count < 1 || count > 10) {
    return {
      success: false,
      error: ERROR_MESSAGES.INVALID_PANE_COUNT,
    };
  }

  return {
    success: true,
    data: count,
  };
}

export function sanitizeBranchName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
    .toLowerCase();
}

export function generateUniqueBranchName(baseName: string, existingNames: string[]): string {
  let counter = 1;
  let candidateName = baseName;

  while (existingNames.includes(candidateName)) {
    candidateName = `${baseName}_${counter.toString().padStart(2, '0')}`;
    counter++;
  }

  return candidateName;
}

async function getProjectName(): Promise<string> {
  try {
    const { stdout } = await execa('git', ['remote', 'get-url', 'origin']);
    const match = stdout.match(/\/([^/]+)\.git$/);
    return match?.[1] ?? 'unknown-project';
  } catch {
    const { stdout } = await execa('basename', [process.cwd()]);
    return stdout.trim();
  }
}

async function getCurrentBranch(): Promise<string> {
  try {
    const { stdout } = await execa('git', ['branch', '--show-current']);
    return stdout.trim();
  } catch {
    return 'main';
  }
}
