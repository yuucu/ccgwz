# 🚀 CCGWZ

**C**laude **C**ode **G**it **W**orktree **Z**ellij

> Work on multiple branches simultaneously with git worktrees, zellij panes, and Claude Code instances.

## ✨ What is CCGWZ?

Imagine working on a feature branch while simultaneously fixing a bug on another branch, all without the hassle of switching contexts. CCGWZ makes this possible by:

- 🌿 Creating isolated git worktrees for each branch
- 🖥️ Setting up organized zellij panes 
- 🤖 Launching Claude Code in each workspace

## 🎯 Quick Start

```bash
# Just run it!
npx ccgwz
# or
bunx ccgwz

# Or install globally
npm install -g ccgwz
# or
bun install -g ccgwz
```

**Requirements**: Git repo + [Zellij](https://zellij.dev/) + [Claude Code](https://claude.ai/code)

## 🎮 Usage

```bash
ccgwz                    # Interactive: create 1 pane
ccgwz --panes 2          # Create 2 panes
```

## 🏗️ What happens?

1. **📍 Validates** your environment (git repo, zellij running)
2. **💬 Prompts** for branch names interactively  
3. **🌳 Creates** worktrees like `../myproject-feature/`
4. **🎛️ Arranges** zellij panes in optimal layout
5. **🚀 Launches** Claude Code in each workspace

## 📖 Documentation

- **[Setup & Development](docs/SETUP.md)** - Development environment setup
- **[Architecture & Design](docs/DESIGN.md)** - Technical architecture
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and solutions
- **[Project Status](docs/TODO.md)** - Development roadmap

## 🤝 Contributing

We welcome contributions! See [docs/SETUP.md](docs/SETUP.md) for development setup.

## 📄 License

MIT