---
title: "複数ブランチを同時に編集できるCLIツール「CCGWZ」を作った"
emoji: "🚀"
type: "tech"
topics: ["git", "cli", "typescript", "開発環境", "worktree"]
published: true
---

# はじめに

複数のブランチで作業する際、`git checkout` でブランチを切り替えるたびにコンテキストを失って効率が悪いと感じたことはありませんか？

私は日々の開発で以下のような課題を抱えていました：

- フィーチャーブランチとホットフィックスを行き来する際の `git stash` → `git checkout` の繰り返し
- ブランチ切り替え時にエディタの状態やファイルの位置を失う
- 間違ったブランチでコミットしてしまうミス
- ビルドやテストの待機時間

これらの問題を解決するために、**CCGWZ**（Claude Code Git Worktree Zellij）というCLIツールを開発しました。

## CCGWZとは

CCGWZは、Git worktreeとZellijを組み合わせて、複数のブランチで同時に作業できる環境を1コマンドで構築するツールです。

![CCGWZの概要](https://github.com/yuucu/ccgwz/raw/main/docs/assets/ccgwz-overview.png)

### 主な機能

- 🌿 **Git worktreeの自動作成** - 各ブランチごとに独立したワークスペース
- 🎛️ **Zellijペインの自動配置** - 最適なレイアウトでペインを配置
- 🤖 **Claude Codeの自動起動** - 各ワークスペースでClaude Codeを起動
- 💬 **インタラクティブなプロンプト** - ブランチ名をわかりやすく入力
- 🎯 **ゼロコンフィグ** - 設定不要で即座に使用可能

## インストール

```bash
# 一回限りの使用
npx ccgwz

# グローバルインストール
npm install -g ccgwz
```

### 必要な環境

- Git repository
- [Zellij](https://zellij.dev/) 
- [Claude Code](https://claude.ai/code)

## 使い方

### 基本的な使用例

```bash
# インタラクティブモード（1ペイン）
ccgwz

# 2ペインで起動
ccgwz --panes 2

# 3ペインで起動
ccgwz --panes 3
```

### 実際の実行例

```bash
$ ccgwz --panes 2
✓ Git repository detected
✓ Zellij session found
? Branch name for pane 1: feature/user-authentication
? Branch name for pane 2: hotfix/login-validation
✓ Created worktree: ../myproject-feature-user-authentication
✓ Created worktree: ../myproject-hotfix-login-validation
✓ Launched Claude Code in 2 panes
🎉 Ready to code!
```

### エイリアスの設定

頻繁に使用する場合は、エイリアスを設定することをお勧めします：

```bash
# .bashrc, .zshrc などに追加
alias zz="npx ccgwz"

# 使用例
zz              # 1ペインで起動
zz --panes 3    # 3ペインで起動
```

## 内部動作

CCGWZは以下の手順で動作します：

1. **環境の検証**
   - Gitリポジトリの確認
   - Zellijセッションの検出

2. **ブランチ名の入力**
   - インタラクティブプロンプトでブランチ名を入力
   - 重複チェックと自動採番

3. **Worktreeの作成**
   - `../プロジェクト名-ブランチ名/` 形式でディレクトリを作成
   - 各ブランチの独立したワークスペースを構築

4. **Zellijペインの配置**
   - ペイン数に応じた最適なレイアウト
   - 2ペイン: 縦分割、3ペイン以上: グリッド配置

5. **Claude Codeの起動**
   - 各ペインでClaude Codeを起動
   - 適切なディレクトリに移動

## 技術スタック

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Package Manager**: Bun
- **CLI Framework**: Commander.js
- **Interactive Prompts**: Inquirer.js
- **Process Management**: Execa

## 実装のポイント

### Git Worktreeの活用

Git worktreeは、同一リポジトリの複数のブランチを異なるディレクトリで同時に作業できる機能です。CCGWZはこの機能を活用して、以下のようにworktreeを管理しています：

```typescript
// worktreeの作成例
const worktreePath = `../${projectName}-${branchName}`;
await execa('git', ['worktree', 'add', worktreePath, branchName]);
```

### Zellijとの連携

Zellijのコマンドを使用してペインを作成・管理します：

```typescript
// ペインの作成
await execa('zellij', ['action', 'new-pane']);

// ディレクトリの移動
await execa('zellij', ['action', 'write-chars', `cd ${worktreePath}`]);
```

### エラーハンドリング

- ブランチ名の重複チェック
- Worktree作成時のエラー処理
- 部分的な失敗時のクリーンアップ

## 使用事例

### ケース1: フィーチャー開発とバグ修正の並行作業

```bash
$ ccgwz --panes 2
? Branch name for pane 1: feature/payment-integration
? Branch name for pane 2: hotfix/cart-calculation-bug
```

左ペインで新機能の決済機能を開発しながら、右ペインで緊急のバグ修正を行えます。

### ケース2: 複数フィーチャーの比較検討

```bash
$ ccgwz --panes 3
? Branch name for pane 1: feature/ui-redesign-v1
? Branch name for pane 2: feature/ui-redesign-v2
? Branch name for pane 3: feature/ui-redesign-v3
```

異なるアプローチのUIデザインを同時に比較・検討できます。

## 今後の予定

- **YAML設定ファイル** - プロジェクト固有の設定
- **セッション管理** - 既存のccgwzセッションの管理
- **クリーンアップ機能** - 古いworktreeの自動削除
- **VS Code連携** - VS Codeでの同時起動

## まとめ

CCGWZは、複数ブランチでの並行開発を効率化するためのシンプルなCLIツールです。Git worktreeの威力をより身近に感じていただけるよう、使いやすさを重視して開発しました。

現在、私自身が日常的に使用しており、開発効率が大幅に向上しています。皆さんの開発ワークフローの改善にも役立てば幸いです。

## リンク

- [GitHub Repository](https://github.com/yuucu/ccgwz)
- [NPM Package](https://www.npmjs.com/package/ccgwz)
- [ドキュメント](https://github.com/yuucu/ccgwz/tree/main/docs)

ぜひお試しください！フィードバックやコントリビューションもお待ちしています。