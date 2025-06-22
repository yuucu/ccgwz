# CCGWZ TODO List

## Phase 1: Project Setup ✅

- [x] Create project structure
- [x] Design document creation
- [ ] Package.json setup with Bun
- [ ] TypeScript configuration
- [ ] Biome configuration
- [ ] Basic CLI structure

## Phase 2: Core Infrastructure

### CLI Foundation
- [ ] Commander.js setup for argument parsing
- [ ] Basic CLI help and version display
- [ ] Argument validation (--panes, --new-session)

### Validation Layer
- [ ] Git repository detection
- [ ] Zellij running status check
- [ ] Zellij version compatibility check
- [ ] Input validation utilities

## Phase 3: Interactive Features

### User Input
- [ ] Inquirer.js setup for interactive prompts
- [ ] Pane count selection (if not provided via CLI)
- [ ] Branch name input for each pane
- [ ] Branch name conflict resolution with auto-increment

### Input Validation
- [ ] Branch name validation (git-safe characters)
- [ ] Duplicate branch name handling
- [ ] Empty input handling

## Phase 4: Git Operations

### Worktree Management
- [ ] Get current project name from git
- [ ] Create git worktrees in `../project-name-branch/` format
- [ ] Handle existing worktree directories
- [ ] Branch creation and checkout
- [ ] Cleanup on failure scenarios

### Error Handling
- [ ] Worktree creation failures
- [ ] Branch name conflicts
- [ ] Permission issues
- [ ] Disk space validation

## Phase 5: Zellij Integration

### Session Management
- [ ] Detect existing zellij sessions
- [ ] Create new session (if --new-session)
- [ ] Attach to existing session

### Pane Management
- [ ] Create specified number of panes
- [ ] Arrange panes in optimal layout
  - [ ] 2 panes: vertical split
  - [ ] 3+ panes: grid layout
- [ ] Navigate to worktree directories in each pane

## Phase 6: Claude Code Integration

### Process Management
- [ ] Launch Claude Code in each pane
- [ ] Handle Claude Code startup delays
- [ ] Error handling for Claude Code failures

### Directory Navigation
- [ ] Change directory to worktree path
- [ ] Verify directory exists before navigation
- [ ] Handle path resolution issues

## Phase 7: Error Handling & UX

### User Experience
- [ ] Clear error messages
- [ ] Progress indicators during operations
- [ ] Success confirmation messages
- [ ] Cleanup instructions on failure

### Robustness
- [ ] Partial failure recovery
- [ ] Graceful shutdown on interruption
- [ ] Resource cleanup on exit

## Phase 8: Testing & Documentation

### Testing
- [ ] Unit tests for core functions
- [ ] Integration tests for workflows
- [ ] Manual testing scenarios
- [ ] Error scenario testing

### Documentation
- [ ] README.md with usage examples
- [ ] CLI help documentation
- [ ] Troubleshooting guide
- [ ] Contributing guidelines

## Phase 9: Distribution & CI

### Package Distribution
- [ ] NPM package publishing setup
- [ ] Version management
- [ ] Binary distribution (if needed)

### CI/CD
- [ ] GitHub Actions setup
- [ ] Automated testing
- [ ] Release automation
- [ ] Biome checks in CI

## Future Enhancements (Post-MVP)

### Advanced Features
- [ ] YAML configuration file support (ccgwz.yaml)
- [ ] Global and project-specific config
- [ ] Custom layout templates via YAML
- [ ] Session naming and management
- [ ] Worktree cleanup utilities

### Auto-start Features
- [ ] Auto-start zellij if not running
- [ ] Auto-install dependencies
- [ ] Smart session detection

### Integration Improvements
- [ ] VS Code integration
- [ ] Custom Claude Code options
- [ ] Project-specific configurations

## Development Notes

### Current Priorities
1. Get basic CLI working with argument parsing
2. Implement git worktree creation
3. Basic zellij pane creation
4. Claude Code launching

### Known Limitations
- Requires zellij to be already running (Phase 1)
- Limited to git repositories
- Assumes Claude Code is available in PATH

### Testing Strategy
- Test on multiple project types
- Verify with different zellij versions
- Test error scenarios thoroughly