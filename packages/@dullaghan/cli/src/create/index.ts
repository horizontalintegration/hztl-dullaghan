// Global
import { execa } from 'execa';
import { exit } from 'process';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import * as fs from 'fs';
import chalk from 'chalk';
import fsExtra from 'fs-extra';
import inquirer from 'inquirer';
import { DullaghanCli } from '@dullaghan/cli-shared-utils';
// Local
import { storybookPackageConfig } from './modules/storybook.js';

const MODULE_CONFIG: Record<string, DullaghanCli.Create.ModulePackageConfig> = {
  storybook: storybookPackageConfig,
};

const STATIC_FILES_TO_COPY = resolve(
  fileURLToPath(import.meta.url),
  '../../../src/create/templates/copy'
);

export const create = async (name: string, { config }: { config?: string }) => {
  const DESTINATION_PATH = resolve(name);

  // Create project directory if it doesn't exist
  if (!fs.existsSync(DESTINATION_PATH)) {
    fs.mkdirSync(DESTINATION_PATH);
  } else {
    console.log('');
    const { overwrite } = await inquirer.prompt({
      name: 'overwrite',
      message: `It looks like a project with the name ${chalk.yellow(
        name
      )} already exists. Are you sure you want to overwrite this project?`,
      type: 'confirm',
    });
    if (overwrite) {
      fs.rmSync(DESTINATION_PATH, { recursive: true, force: true });
      fs.mkdirSync(DESTINATION_PATH);
    } else {
      exit(1);
    }
  }

  // Create missing config
  console.log('');
  const { appName, optionalModules } = await inquirer.prompt([
    {
      name: 'appName',
      message: 'What is the corresponding Sitecore app name?',
    },
    {
      name: 'optionalModules',
      message: 'Optional modules to include',
      type: 'checkbox',
      choices: [{ name: 'Storybook', value: 'storybook' }],
    },
  ]);

  // Copy static files
  try {
    fsExtra.copySync(STATIC_FILES_TO_COPY, DESTINATION_PATH);
  } catch (err) {
    console.error(err);
    exit(1);
  }

  // Copy optional module files
  if (optionalModules.length > 0) {
    (optionalModules as string[]).forEach((module) => {
      const moduleFiles = resolve(
        fileURLToPath(import.meta.url),
        '../../../src/create/templates/modules',
        module
      );

      try {
        fsExtra.copySync(moduleFiles, DESTINATION_PATH);
      } catch (err) {
        console.error(err);
        exit(1);
      }
    });
  }

  // Make updates to package.json
  const packagePath = resolve(DESTINATION_PATH, 'package.json');
  const packageJson: DullaghanCli.Create.PackageJson = JSON.parse(
    fs.readFileSync(packagePath, {
      encoding: 'utf-8',
    })
  );

  packageJson.name = name;
  packageJson.config.appName = appName;

  // Add optional module config
  if (optionalModules.length > 0) {
    (optionalModules as string[]).forEach((module) => {
      if (MODULE_CONFIG.hasOwnProperty(module)) {
        Object.entries(MODULE_CONFIG[module]).forEach(([key, val]) => {
          const propMap = val.reduce(
            (
              prev: Record<string, string>,
              curr: DullaghanCli.Create.PackageTuple
            ) => ({
              ...prev,
              [curr[0]]: curr[1],
            }),
            {}
          );
          (packageJson as any)[key] = {
            ...(packageJson as any)[key],
            ...propMap,
          };
        });
      }
    });
  }

  fs.writeFileSync(packagePath, JSON.stringify(packageJson));

  // Duplicate the .env file
  fsExtra.copySync(
    resolve(DESTINATION_PATH, '.env'),
    resolve(DESTINATION_PATH, '.env.local')
  );

  // Execute external command line setups
  console.log(`
Installing dependencies`);
  await execa('npm', ['i'], { cwd: DESTINATION_PATH });

  console.log('Bootstrapping JSS files');
  // Authorable folder is required to exist
  const authorablePath = resolve(DESTINATION_PATH, 'components', 'authorable');
  if (!fs.existsSync(authorablePath)) {
    fs.mkdirSync(authorablePath);
  }
  await execa('jss', ['bootstrap'], { cwd: DESTINATION_PATH });

  // Run prettier on package.json
  await execa(
    'npx',
    ['prettier', '-w', '--config', '.prettierrc', 'package.json'],
    { cwd: DESTINATION_PATH }
  );

  // Completed
  console.log(`
Project ${chalk.green(`${name}`)} has been created.

To get started:
- Add the appropriate Sitecore variables to the ${chalk.cyan('.env.local')} file
- Run ${chalk.cyan(`cd ${name} && jss start:connected`)}

If you haven't already, run ${chalk.cyan(
    'dullaghan git-hooks'
  )} at the root of this repository.
`);
};
