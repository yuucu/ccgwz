import { Command } from 'commander';
import type { CLIOptions } from '../types/index.js';

export function createCLIParser(): Command {
  const program = new Command();

  program
    .name('ccgwz')
    .description('Claude Code Git Worktree Zellij - Parallel development with git worktrees')
    .version('0.1.0');

  program
    .option('-p, --panes <number>', 'Number of panes to create', parseIntOption, 1)
    .option('-h, --help', 'Display help information');

  return program;
}

export function parseCLIOptions(args: string[]): CLIOptions {
  const program = createCLIParser();
  program.parse(args);

  const options = program.opts();

  return {
    panes: options.panes,
    help: options.help,
    version: options.version,
  };
}

function parseIntOption(value: string): number {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid number: ${value}`);
  }
  return parsed;
}
