// Global
import { exit } from 'process';
import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import { resolve } from 'path';
// Utils
import { getConfig } from '../utils/get-config.js';

export const scaffold = async (name: string, options: DullahanCli.Scaffold.CLIArgs) => {
  const config = getConfig(options.config || process.cwd());

  if (!config.scaffold) {
    console.log(
      chalk.red(
        'The scaffold config is invalid. Please remove the scaffold key from your custom config.'
      )
    );
    exit(1);
  }

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

  const COMPONENT_DIRECTORY_PATH = resolve(subdirectory.path, name);

  // Get the scaffold options
  const {
    scaffoldOptSelections,
  }: { scaffoldOptSelections: DullahanCli.Scaffold.CLIUserOptions[] } = await inquirer.prompt([
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
  console.log(COMPONENT_DIRECTORY_PATH);
  if (!fs.existsSync(COMPONENT_DIRECTORY_PATH)) {
    fs.mkdirSync(COMPONENT_DIRECTORY_PATH, { recursive: true });
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

  // TODO: Detect which files already exist here, ask about deleting them as a checkbox

  Promise.all(
    Object.entries(filesToCreate).map(([key, val]) => {
      const filePath = resolve(COMPONENT_DIRECTORY_PATH, key.replace(/(\[name\])/g, name));
      const fileContents = val(scaffoldTemplateArgs);
      return fs.writeFile(filePath, fileContents, (err) => {
        if (err) {
          console.error(err);
        }
      });
    })
  );

  console.log(`
${chalk.green(name)} has been created.
`);
};
