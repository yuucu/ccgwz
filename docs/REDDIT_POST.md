# Reddit Post: CCGWZ Introduction

## Post Title
🚀 I built CCGWZ - Work on multiple git branches simultaneously with Claude Code

## Post Content

**TL;DR**: One command creates isolated git worktrees, sets up zellij panes, and launches Claude Code instances for true parallel development.

### The Problem 🤔

Ever find yourself juggling multiple branches? Switching between a feature branch and a hotfix, losing context every time you `git checkout`? Or worse, making changes in the wrong branch?

I was tired of:
- `git stash` → `git checkout` → work → `git checkout` → `git stash pop` loops
- Losing my place when switching between branches
- Accidentally committing to the wrong branch
- Waiting for builds/tests when switching contexts

### The Solution ✨

**CCGWZ** (Claude Code Git Worktree Zellij) solves this with one simple command:

```bash
npx ccgwz --panes 2
```

What happens:
1. 📍 Creates isolated git worktrees (`../myproject-feature/`, `../myproject-hotfix/`)
2. 🎛️ Sets up organized zellij panes
3. 🤖 Launches Claude Code in each workspace
4. 🚀 You're coding in parallel instantly!

### Demo 🎥

```bash
$ npx ccgwz --panes 2
✓ Git repository detected
✓ Zellij session found
? Branch name for pane 1: feature/new-auth
? Branch name for pane 2: hotfix/login-bug
✓ Created worktree: ../myproject-feature-new-auth
✓ Created worktree: ../myproject-hotfix-login-bug  
✓ Launched Claude Code in 2 panes
🎉 Ready to code!
```

Now you have two completely isolated environments running simultaneously!

### Why I Built This 🛠️

As someone who works on multiple features and fixes daily, context switching was killing my productivity. Git worktrees are powerful but tedious to set up manually. Zellij provides great terminal multiplexing. Claude Code makes development faster.

CCGWZ combines all three into a seamless workflow.

### Features 🎯

- **One command setup** - No complex git worktree commands
- **Smart layouts** - Vertical split for 2 panes, grid for 3+
- **Interactive prompts** - Just run `npx ccgwz` and follow along
- **Branch conflict handling** - Auto-increments duplicate names
- **Zero config** - Works out of the box

### Try It Now 🏃‍♂️

Requirements: Git repo + [Zellij](https://zellij.dev/) + [Claude Code](https://claude.ai/code)

```bash
# One-off usage
npx ccgwz

# Or install globally  
npm install -g ccgwz
ccgwz --panes 3
```

**Pro tip**: Add `alias zz="npx ccgwz"` to your shell profile for instant access!

### What's Next 🔮

- YAML config files for project-specific settings
- Auto-start zellij if not running  
- Session management and cleanup utilities
- VS Code integration

---

**Links:**
- [GitHub](https://github.com/yuucu/ccgwz) 
- [NPM](https://www.npmjs.com/package/ccgwz)

Built this because I needed it daily. Hope it helps your workflow too! 

What's your current workflow for managing multiple branches? Would love to hear how others handle this!

## Posting Strategy

### Recommended Subreddits
- `r/programming` - Main programming community
- `r/javascript` - JavaScript/Node.js focus
- `r/CLI` - Command line tools
- `r/git` - Git-specific community
- `r/devtools` - Developer tools
- `r/sideproject` - Personal projects showcase

### Best Posting Times
- **Weekdays**: 9-11 AM or 2-4 PM (EST/PST)
- **Tuesday-Thursday**: Generally better engagement
- Avoid Friday evenings and weekends

### Follow-up Comment Strategy
Post an initial comment with additional details:
- Installation troubleshooting tips
- Link to documentation
- Future roadmap items
- Request for feedback and contributions

### Engagement Tips
- Respond quickly to early comments
- Be helpful with troubleshooting
- Share technical details when asked
- Thank users for feedback and suggestions