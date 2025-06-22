import inquirer from 'inquirer';
import type { BranchInfo } from '../types/index.js';
import { sanitizeBranchName, generateUniqueBranchName } from '../utils/validation.js';

export async function promptForBranches(
  paneCount: number,
  projectName: string,
  existingBranches: string[] = []
): Promise<BranchInfo[]> {
  const branches: BranchInfo[] = [];
  const usedNames: string[] = [...existingBranches];

  for (let i = 1; i <= paneCount; i++) {
    const { branchName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'branchName',
        message: `Enter branch name for pane ${i}:`,
        validate: (input: string) => {
          if (!input.trim()) {
            return 'Branch name cannot be empty';
          }
          return true;
        },
      },
    ]);

    const sanitizedName = sanitizeBranchName(branchName);
    const uniqueName = generateUniqueBranchName(sanitizedName, usedNames);
    const worktreePath = `../${projectName}-${uniqueName}`;

    if (uniqueName !== sanitizedName) {
      console.log(`Branch name adjusted to avoid conflicts: ${uniqueName}`);
    }

    branches.push({
      name: branchName,
      sanitizedName: uniqueName,
      worktreePath,
    });

    usedNames.push(uniqueName);
  }

  return branches;
}

export function showPlannedWorktrees(branches: BranchInfo[]): void {
  console.log('\nPlanned worktrees:');
  branches.forEach((branch, index) => {
    console.log(`  ${index + 1}. ${branch.sanitizedName} -> ${branch.worktreePath}`);
  });
  console.log(''); // 空行を追加
}
