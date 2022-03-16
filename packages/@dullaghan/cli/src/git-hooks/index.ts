// Global
import { execa } from 'execa';
import { resolve } from 'path';
import { exit } from 'process';
import * as fs from 'fs';
import chalk from 'chalk';
import inquirer from 'inquirer';
// Local
import { commitLint } from './templates/commit-lint.js';
import { commitMsg } from './templates/commit-msg.js';
import { preCommit } from './templates/pre-commit.js';
import { prePush } from './templates/pre-push.js';

const INVALID_PROJECT_ERROR = `
${chalk.cyan('dullaghan git-hooks')} is meant to be run at the root of your existing repository.

- If you are creating a front-end only JSS repository, first run ${chalk.cyan('dullaghan create')}.
- If you are just trying to install the git hooks first run ${chalk.cyan('git init && npm init')}.
`;

export const gitHooks = async () => {
  console.log('');
  const PACKAGE_PATH = resolve('./package.json');
  // Check if package.json exists
  if (!fs.existsSync(PACKAGE_PATH)) {
    console.log(`${chalk.yellow('No package.json exists in this directory.')}`);
    console.log(INVALID_PROJECT_ERROR);
    exit(1);
  }

  // Check if .git exists
  if (!fs.existsSync('./.git')) {
    console.log(`${chalk.yellow('Git is not initialized in this repository.')}`);
    console.log(INVALID_PROJECT_ERROR);
    exit(1);
  }

  const { jiraKey } = await inquirer.prompt({
    name: 'jiraKey',
    message: `What is the JIRA key for this project? ${chalk.gray('Ex: HDJ')}`,
    validate: (str: string) =>
      /[A-Z]+/g.test(str) ? true : 'The JIRA key must be uppercase and contain only letters.',
  });

  // Add package commands
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_PATH, { encoding: 'utf-8' }));
  packageJson.scripts.prepare = 'husky install';
  if (!packageJson.scripts.hasOwnProperty('pre-commit')) {
    packageJson.scripts['pre-commit'] = packageJson.scripts.hasOwnProperty('lint')
      ? 'npm run lint'
      : 'echo error no pre-commit specified && exit 1';
  }

  if (!packageJson.scripts.hasOwnProperty('pre-push')) {
    packageJson.scripts['pre-push'] = packageJson.scripts.hasOwnProperty('test')
      ? 'npm run test'
      : 'echo error no pre-push specified && exit 1';
  }

  fs.writeFileSync(PACKAGE_PATH, JSON.stringify(packageJson));

  // Install package dependencies
  console.log(`
Installing dependencies
`);
  await execa('npm', [
    'i',
    '-D',
    'husky',
    '@commitlint/cli',
    'commitlint-config-jira',
    'commitlint-plugin-jira-rules',
  ]);

  // Init husky
  console.log(`Initializing husky
`);
  await execa('husky', ['install']);

  // Create commitlint config
  fs.writeFileSync(resolve('commitlint.config.js'), commitLint(jiraKey));

  // Create husky command files
  const HUSKY_PATH = resolve('./.husky');
  const filesToCreate = [
    { template: commitMsg, file: 'commit-msg' },
    { template: preCommit, file: 'pre-commit' },
    { template: prePush, file: 'pre-push' },
  ];

  filesToCreate.forEach(({ template, file }) => {
    const path = resolve(HUSKY_PATH, file);
    fs.writeFileSync(path, template(jiraKey));
    fs.chmodSync(path, '755');
  });

  console.log('Git hooks installed');
};
