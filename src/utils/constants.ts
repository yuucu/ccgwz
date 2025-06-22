import type { Config } from '../types/index.js';

export const DEFAULT_CONFIG: Config = {
  default: {
    panes: 2,
    layout: 'vertical',
  },
  git: {
    worktreePrefix: '../',
    branchPrefix: '',
    autoIncrement: true,
  },
  zellij: {
    sessionName: 'ccgwz',
    autoStart: false,
  },
  claudeCode: {
    command: 'claude',
    args: [],
    startupDelay: 1000,
  },
};

export const CONFIG_FILES = [
  './ccgwz.yaml',
  '~/.config/ccgwz/config.yaml',
  '~/.ccgwz.yaml',
] as const;

export const ZELLIJ_COMMANDS = {
  LIST_SESSIONS: 'zellij list-sessions',
  NEW_TAB: (name: string) => `zellij action new-tab --name "${name}"`,
  NEW_PANE_RIGHT: 'zellij action new-pane -d right',
  NEW_PANE_DOWN: 'zellij action new-pane -d down',
  MOVE_FOCUS_UP: 'zellij action move-focus up',
  RUN_COMMAND: (cwd: string, command: string) =>
    `zellij action new-pane --cwd "${cwd}" -- ${command}`,
} as const;

export const GIT_COMMANDS = {
  IS_REPO: 'git rev-parse --is-inside-work-tree',
  GET_PROJECT_NAME: 'git remote get-url origin',
  GET_CURRENT_BRANCH: 'git branch --show-current',
  CREATE_WORKTREE: (path: string, branch: string) => `git worktree add "${path}" -b "${branch}"`,
  LIST_WORKTREES: 'git worktree list',
} as const;

export const ERROR_MESSAGES = {
  NOT_GIT_REPO: 'Current directory is not a git repository',
  ZELLIJ_NOT_RUNNING: 'Zellij is not running. Please start zellij first',
  INVALID_PANE_COUNT: 'Pane count must be between 1 and 10',
  WORKTREE_EXISTS: 'Worktree directory already exists',
  BRANCH_EXISTS: 'Branch already exists',
  CLAUDE_NOT_FOUND: 'Claude Code command not found',
} as const;
