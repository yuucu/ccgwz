export interface CLIOptions {
  panes: number;
  newSession: boolean;
  sessionName?: string;
  help?: boolean;
  version?: boolean;
}

export interface BranchInfo {
  name: string;
  sanitizedName: string;
  worktreePath: string;
}

export interface Config {
  default: {
    panes: number;
    newSession: boolean;
    layout: 'vertical' | 'horizontal' | 'grid';
  };
  git: {
    worktreePrefix: string;
    branchPrefix: string;
    autoIncrement: boolean;
  };
  zellij: {
    sessionName: string;
    autoStart: boolean;
  };
  claudeCode: {
    command: string;
    args: string[];
    startupDelay: number;
  };
}

export type Result<T> = { success: true; data: T } | { success: false; error: string };

export interface GitInfo {
  isRepository: boolean;
  projectName: string;
  currentBranch: string;
}

export interface ZellijInfo {
  isRunning: boolean;
  sessions: string[];
  currentSession?: string;
}

export interface WorktreeCreationResult {
  branchName: string;
  worktreePath: string;
  created: boolean;
}
