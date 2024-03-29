#!/usr/bin/env node

// Global
import { program } from 'commander';
// Actions
import { create } from './create/index.js';
import { gitHooks } from './git-hooks/index.js';
import { scaffold } from './scaffold/index.js';

program.version('0.3.0').usage('<command> [options]');

// Create
program
  .command('create <project-name>')
  .description('scaffold a new project')
  .option('-c, --config', 'relative path to the dullaghan.config.js file')
  .action((name: string, options: { config?: string }) => {
    create(name, options);
  });

// Git hooks
program
  .command('git-hooks')
  .description('install hooks to enforce consistency in commits')
  .action(() => {
    gitHooks();
  });

// Scaffold
program
  .command('scaffold <component-name>')
  .description('create template files for components')
  .option('-c, --config', 'relative path to the dullaghan.config.js file')
  .action((name: string, options: { config?: string }) => {
    scaffold(name, options);
  });

program.parse(process.argv);
