#!/usr/bin/env node

import { parseCLIOptions } from './cli/parser.js';
import { ProcessOrchestrator } from './managers/process.js';

async function main(): Promise<void> {
  try {
    const options = parseCLIOptions(process.argv);

    if (options.help) {
      console.log(`
ccgwz - Claude Code Git Worktree Zellij

USAGE:
  ccgwz [OPTIONS]

OPTIONS:
  -p, --panes <number>     Number of panes to create (default: 2)
  -n, --new-session        Create new zellij session  
  -s, --session-name <name> Name for new session (default: ccgwz)
  -h, --help               Display this help message

EXAMPLES:
  ccgwz                    Create 2 panes in existing session
  ccgwz --panes 3          Create 3 panes
  ccgwz --new-session      Create new session
      `);
      return;
    }

    if (options.version) {
      console.log('ccgwz version 0.1.0');
      return;
    }

    const orchestrator = new ProcessOrchestrator();
    const result = await orchestrator.execute(options);

    if (!result.success) {
      console.error(`Error: ${result.error}`);
      process.exit(1);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Unexpected error: ${errorMessage}`);
    process.exit(1);
  }
}

if (import.meta.url.endsWith(process.argv[1]!)) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
