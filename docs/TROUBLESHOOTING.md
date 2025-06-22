# Troubleshooting

## Common Issues

### Not in Git Repository

**Error**: `Error: Not in a git repository. Please run ccgwz from within a git project.`

**Solution**: Navigate to the root directory of your git project and run the command again.

### Zellij Not Running

**Error**: `Error: Zellij is not running. Please start zellij first or use --new-session.`

**Solutions**:
- Start zellij first: `zellij`
- Use the `--new-session` flag: `ccgwz --new-session`

### Branch Name Conflicts

**Issue**: When you enter branch names that already exist, CCGWZ automatically handles conflicts by appending `_01`, `_02`, etc.

**Example**: If you enter `feature` but it already exists, it becomes `feature_01`.

### Worktree Creation Failures

**Error**: `Error: Failed to create worktree for branch X`

**Common causes**:
- Directory already exists
- Insufficient permissions
- Disk space issues
- Git repository corruption

**Solutions**:
- Check available disk space
- Verify directory permissions
- Clean up existing worktree directories manually
- Check git repository status with `git status`

### Claude Code Not Found

**Error**: `Error: claude-code command not found`

**Solution**: Install Claude Code CLI tool first:
```bash
# Follow Claude Code installation instructions
npm install -g claude-code
# or
curl -sSL https://claude.ai/install.sh | bash
```

### Zellij Version Compatibility

Some zellij versions may have different command syntax. CCGWZ is tested with:
- Zellij 0.39.0+

If you encounter issues, check your zellij version:
```bash
zellij --version
```

## Cleanup

If CCGWZ fails partially, you might need to clean up manually:

### Remove Worktrees

```bash
# List all worktrees
git worktree list

# Remove specific worktree
git worktree remove path/to/worktree

# Force remove if needed
git worktree remove --force path/to/worktree
```

### Remove Branches

```bash
# List all branches
git branch -a

# Delete local branch (if safe)
git branch -d branch-name

# Force delete branch
git branch -D branch-name
```

## Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/your-repo/ccgwz/issues)
2. Create a new issue with:
   - Your operating system
   - Node.js version (`node --version`)
   - Zellij version (`zellij --version`)
   - Complete error message
   - Steps to reproduce