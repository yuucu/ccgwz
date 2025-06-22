# CCGWZ Design Document

## Overview

CCGWZ (Claude Code Git Worktree Zellij) is a CLI tool that enables parallel development by creating multiple zellij panes with git worktrees and Claude Code instances.

## Architecture

### Core Components

1. **CLI Parser** - Handle command line arguments and options
2. **Git Manager** - Manage git worktrees and branch operations  
3. **Zellij Manager** - Handle zellij session and pane operations
4. **Interactive Input** - Prompt for branch names and configuration
5. **Process Orchestrator** - Coordinate worktree creation and Claude Code launching

### Technology Stack

- **Runtime**: Node.js (18+)
- **Language**: TypeScript
- **Package Manager**: Bun
- **Linter/Formatter**: Biome
- **CLI Framework**: Commander.js
- **Interactive Prompts**: Inquirer.js

## CLI Interface

### Commands

```bash
# Basic usage
npx ccgwz

# Specify number of panes
npx ccgwz --panes 3

# Create new zellij session
npx ccgwz --new-session

# Help
npx ccgwz --help
```

### Options

- `--panes <number>`: Number of panes to create (default: 1)
- `--new-session`: Create new zellij session instead of using existing
- `--help`: Show help information

## Workflow

1. **Validation**
   - Check if current directory is git repository
   - Verify zellij is running (unless --new-session)
   - Validate zellij version compatibility

2. **Interactive Input**
   - Prompt for number of panes (if not specified)
   - For each pane, prompt for branch name
   - Handle duplicate branch names with auto-increment

3. **Worktree Creation**
   - Create git worktrees in `../project-name-branch/` format
   - Handle branch name conflicts with `_01`, `_02` suffixes

4. **Zellij Management**
   - Create panes in existing session or new session
   - Arrange panes in appropriate layout (vertical split for 2, grid for 3+)

5. **Claude Code Launch**
   - Navigate to each worktree directory
   - Launch Claude Code in each pane

## Directory Structure

```
ccgwz/
├── src/
│   ├── index.ts              # Main entry point
│   ├── cli/
│   │   ├── parser.ts         # CLI argument parsing
│   │   └── prompts.ts        # Interactive prompts
│   ├── managers/
│   │   ├── git.ts            # Git operations
│   │   ├── zellij.ts         # Zellij operations
│   │   └── process.ts        # Process orchestration
│   ├── utils/
│   │   ├── validation.ts     # Input validation
│   │   └── constants.ts      # Constants and configs
│   └── types/
│       └── index.ts          # Type definitions
├── dist/                     # Compiled JavaScript
├── package.json
├── tsconfig.json
├── biome.json
├── DESIGN.md
└── TODO.md
```

## Error Handling

### Git Repository Validation
- Exit with error if not in git repository
- Provide helpful message about running in project root

### Zellij Session Management
- Check if zellij is running
- Future: Auto-start zellij session if not running

### Branch Name Conflicts
- Auto-increment with `_01`, `_02` suffixes
- Inform user of renamed branches

### Worktree Creation Failures
- Handle directory already exists
- Handle git branch conflicts
- Clean up partial worktrees on failure

## Layout Management

### 2 Panes (Default)
```
┌─────────────┬─────────────┐
│    Pane 1   │    Pane 2   │
│  Branch A   │  Branch B   │
└─────────────┴─────────────┘
```

### 3+ Panes
```
┌─────────────┬─────────────┐
│    Pane 1   │    Pane 2   │
│  Branch A   │  Branch B   │
├─────────────┼─────────────┤
│    Pane 3   │    Pane 4   │
│  Branch C   │  Branch D   │
└─────────────┴─────────────┘
```

## Configuration File

### YAML Configuration (`ccgwz.yaml`)

```yaml
# Default ccgwz configuration
default:
  panes: 2
  newSession: false
  layout: "vertical"  # vertical, horizontal, grid
  
# Git settings
git:
  worktreePrefix: "../"
  branchPrefix: ""
  autoIncrement: true

# Zellij settings
zellij:
  sessionName: "ccgwz"
  autoStart: false

# Claude Code settings
claudeCode:
  command: "claude-code"
  args: []
  startupDelay: 1000

# Layout templates
layouts:
  vertical:
    type: "split"
    direction: "vertical"
  horizontal:
    type: "split" 
    direction: "horizontal"
  grid:
    type: "grid"
    columns: 2
```

### Configuration Priority
1. CLI arguments (highest)
2. Project-specific `ccgwz.yaml`
3. Global `~/.config/ccgwz/config.yaml`
4. Built-in defaults (lowest)

## Future Enhancements

1. **Auto-start Zellij**: Launch zellij if not running
2. **YAML Config**: Support `ccgwz.yaml` for project settings
3. **Layout Templates**: Predefined pane arrangements via YAML
4. **Cleanup Command**: Remove old worktrees and branches
5. **Session Management**: List and switch between ccgwz sessions