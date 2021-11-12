// Global
import { exit } from 'process';
import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
// Interfaces
import type { DullahanCli } from '../../dullahan-cli';
// Utils
import getConfig from '../get-config';

const scaffold = async (name: string, options: DullahanCli.Scaffold.MethodArgs) => {
  const config = getConfig(options.config || process.cwd());

  // Get the related subdirectory config
  const { subdirectoryName } = await inquirer.prompt([
    {
      name: 'subdirectoryName',
      type: 'list',
      message: 'Select the subdirectory for your component:',
      choices: config.scaffold?.subdirectories || [],
      pageSize: 10,
    },
  ]);

  const subdirectory = config.scaffold.subdirectories.find((s) => s.name === subdirectoryName);

  if (!subdirectory) {
    console.log(
      `The subdirectory: ${chalk.yellow(
        subdirectoryName
      )} was not found in the config. Do you need to add it to the ${chalk.cyan(
        'dullahan.config'
      )} file?`
    );
    // TODO: Add link to README on repo for the config
    exit(1);
  }

  const componentDirectory = path.join(process.cwd(), subdirectory.path, name);

  // Get the scaffold options
  const { scaffoldOptSelections }: { scaffoldOptSelections: DullahanCli.Scaffold.TemplateOpts[] } =
    await inquirer.prompt([
      {
        name: 'scaffoldOptSelections',
        type: 'checkbox',
        message: 'Select any customizations needed for your component:',
        choices: [
          { name: 'Contains a Placeholder component', value: 'hasPlaceholder' },
          {
            name: 'Uses data from getStaticProps (connected GraphQL or other server-side API calls)',
            value: 'hasGetStaticProps',
          },
          { name: 'Contains a next/dynamic import', value: 'hasNextDynamic' },
        ],
      },
    ]);

  // Build scaffold template args
  const scaffoldTemplateArgs: DullahanCli.Scaffold.TemplateArgs = {
    name,
    subdirectory,
    hasGetStaticProps: false,
    hasNextDynamic: false,
    hasPlaceholder: false,
  };

  scaffoldOptSelections.forEach((key) => {
    scaffoldTemplateArgs[key] = true;
  });

  // Create the base directory
  if (!fs.existsSync(componentDirectory)) {
    fs.mkdirSync(componentDirectory, { recursive: true });
  }

  // Create the files
  // TODO: Smart merge if subdirectory.templates is an empty array
  const filesToCreate = {
    ...config.scaffold.templates,
    ...subdirectory.templates,
  };

  if (!filesToCreate) {
    console.log(
      chalk.red(
        `ERROR: No template files have been configured to be created for subdirectory: ${subdirectory.name}.`
      )
    );
    exit(1);
  }

  console.log(scaffoldTemplateArgs);
  console.log(filesToCreate);

  // TODO: Detect which files already exist here, ask about deleting them as a checkbox

  Promise.all(
    Object.entries(filesToCreate).map(([key, val]) => {
      const filePath = path.join(componentDirectory, key.replace(/(\[name\])/g, name));
      const fileContents = val(scaffoldTemplateArgs);
      return fs.writeFile(filePath, fileContents, (err) => {
        if (err) {
          console.error(err);
        }
      });
    })
  );
};

export default scaffold;
