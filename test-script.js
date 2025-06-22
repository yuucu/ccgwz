#!/usr/bin/env node

import { spawn } from 'node:child_process';

// Test scenario: Create 2 worktrees with predefined branch names
const testBranches = ['feature-auth', 'feature-ui'];
const testResponses = testBranches.concat(['y']); // branch names + confirmation

console.log('🧪 Testing CCGWZ with automated input...');
console.log(`Branches to create: ${testBranches.join(', ')}`);

const child = spawn('node', ['dist/index.js', '--panes', '2'], {
  stdio: ['pipe', 'inherit', 'inherit']
});

// Send responses automatically
let responseIndex = 0;
const sendNextResponse = () => {
  if (responseIndex < testResponses.length) {
    setTimeout(() => {
      const response = testResponses[responseIndex++];
      console.log(`\n📝 Sending: "${response}"`);
      child.stdin.write(`${response}\n`);
      sendNextResponse();
    }, 1000); // Wait 1 second between responses
  } else {
    // Close stdin after all responses
    setTimeout(() => {
      child.stdin.end();
    }, 1000);
  }
};

child.on('spawn', () => {
  console.log('🚀 CCGWZ process started');
  // Start sending responses after a delay
  setTimeout(sendNextResponse, 2000);
});

child.on('close', (code) => {
  console.log(`\n✅ CCGWZ process exited with code: ${code}`);
  
  if (code === 0) {
    console.log('🎉 Test completed successfully!');
    
    // Check if worktrees were created
    setTimeout(() => {
      import('node:fs').then(fs => {
        testBranches.forEach(branch => {
          const worktreePath = `../ccgwz-${branch}`;
          if (fs.existsSync(worktreePath)) {
            console.log(`✅ Worktree created: ${worktreePath}`);
          } else {
            console.log(`❌ Worktree not found: ${worktreePath}`);
          }
        });
      });
    }, 1000);
  } else {
    console.log('❌ Test failed');
  }
});

child.on('error', (error) => {
  console.error('❌ Error running CCGWZ:', error);
});