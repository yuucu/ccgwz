# Development Setup

## Prerequisites

- Node.js 18+
- Bun package manager
- Git
- [Zellij](https://zellij.dev/) terminal multiplexer
- [Claude Code](https://claude.ai/code) CLI tool

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd ccgwz

# Install dependencies
bun install
```

## Development Scripts

- `bun run dev` - Run in development mode with tsx
- `bun run build` - Build TypeScript to JavaScript
- `bun run start` - Run the built version
- `bun run check` - Run Biome checks (lint + format)
- `bun run format` - Format code with Biome
- `bun run lint` - Lint code with Biome
- `bun run typecheck` - Type check with TypeScript

## Project Structure

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
├── docs/                     # Documentation
├── package.json
├── tsconfig.json
└── biome.json
```

## Testing

```bash
# Run type checking
bun run typecheck

# Run linting
bun run lint

# Run all checks
bun run check
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and checks: `bun run check`
5. Submit a pull request