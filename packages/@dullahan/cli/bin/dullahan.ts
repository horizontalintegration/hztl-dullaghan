#!/usr/bin/env npx ts-node

// Global
import { Command } from 'commander';
import chalk from 'chalk';
import leven from 'leven';
// Local
import { version } from '../package.json';
import create from '../lib/create';
import scaffold from '../lib/scaffold';

const program = new Command();

program.version(`@dullahan/cli ${version}`).usage('<command> [options]');

program
  .command('create <app-name>')
  .description('create a new JSS project')
  .option('-c, --config', 'relative path to dullahan.config.js file')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .action((name, options) => {
    create(name, options);
  });

program
  .command('scaffold <component-name>')
  .description('scaffold files for JSS components')
  .option('-c, --config', 'relative path to dullahan.config.js file')
  .action((name, options) => {
    scaffold(name, options);
  });

// output help information on unknown commands
program.on('command:*', ([cmd]) => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
  suggestCommands(cmd);
  process.exitCode = 1;
});

// add some useful info on help
program.on('--help', () => {
  console.log();
  console.log(
    `  Run ${chalk.cyan(`dullahan <command> --help`)} for detailed usage of given command.`
  );
  console.log();
});

program.commands.forEach((c) => c.on('--help', () => console.log()));

program.parse(process.argv);

const suggestCommands = (unknownCommand: string) => {
  const availableCommands = program.commands.map((cmd) => cmd.name());

  let suggestion = '';

  availableCommands.forEach((cmd) => {
    const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand);
    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd;
    }
  });

  if (!!suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`));
  }
};

export default program;
