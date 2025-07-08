#!/usr/bin/env node

const { execSync } = require('child_process');

const message = process.argv[2];

if (!message) {
  console.error('Usage: gitpush <commit-message>');
  process.exit(1);
}

try {
  execSync('git status', { stdio: 'inherit' });
  execSync('git add -A', { stdio: 'inherit' });
  execSync('git status', { stdio: 'inherit' });
  execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
  const branch = execSync('git branch --show-current').toString().trim();
  execSync(`git push -f origin ${branch}`, { stdio: 'inherit' });
} catch (err) {
  process.exit(1);
}
