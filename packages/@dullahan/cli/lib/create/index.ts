// Global
import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
// Interfaces
import type { DullahanCli } from '../../dullahan-cli';
// Local
import getDependencies from './dependencies';

const create = async (name: string, options: DullahanCli.Create.MethodArgs) => {
  // TODO: Validate name
  const projectDir = path.resolve(process.cwd(), name);

  if (fs.existsSync(projectDir)) {
    if (!options.force) {
      const { ok } = await inquirer.prompt([
        {
          name: 'ok',
          type: 'confirm',
          message: `Target directory ${chalk.cyan(
            projectDir
          )} already exists. Would you like to overwrite it?:`,
        },
      ]);
      if (!ok) {
        return;
      }
    }

    await fs.unlinkSync(projectDir);
  }

  fs.mkdirSync(projectDir);

  // TODO: Prompt for module includes, do fun stuff
  const { modules } = await inquirer.prompt([
    {
      name: 'modules',
      type: 'checkbox',
      message: 'Select the modules needed for your project:',
      choices: [
        { name: 'Storybook', value: 'storybook' },
        { name: 'Tailwind', value: 'tailwind' },
        { name: 'Jest', value: 'jest' },
      ],
      pageSize: 10,
    },
  ]);

  console.log(modules);

  const dependencies = getDependencies(modules);

  console.log(dependencies);
};

export default create;
