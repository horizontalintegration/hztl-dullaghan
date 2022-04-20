// Global
import { exit } from 'process';
import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import { resolve } from 'path';
// Utils
import { getConfig } from '../utils/get-config.js';

export const scaffold = async (name: string, options: DullaghanCli.Scaffold.CliArgs) => {
  if (!/^[A-Z][A-Za-z]+/g.test(name)) {
    console.log(`${chalk.yellow(
      'Your component name must be pascal case and contain only letters.'
    )}
${chalk.gray('Ex: FooBar, MyCard, Accordion')}`);
    exit(1);
  }

  const config = await getConfig(options.config || process.cwd());

  if (!config.scaffold) {
    console.log(
      chalk.red(
        'The provided scaffold config is invalid. Please remove the scaffold key from your custom config or replace it with a valid scaffold config.'
      )
    );
    exit(1);
  }

  // Get the related subdirectory config
  let subdirectory = config.scaffold.subdirectories[0];

  // Ask for subdirectory if more than one is configured
  if (config.scaffold.subdirectories.length > 1) {
    const { subdirectoryName } = await inquirer.prompt([
      {
        name: 'subdirectoryName',
        type: 'list',
        message: 'Select the subdirectory for your component:',
        choices: config.scaffold?.subdirectories || [],
        pageSize: 10,
      },
    ]);

    const selectedSubdirectory = config.scaffold.subdirectories.find(
      (s) => s.name === subdirectoryName
    );

    if (!selectedSubdirectory) {
      console.log(
        `The subdirectory: ${chalk.yellow(
          subdirectoryName
        )} was not found in the supplied config. Do you need to add it's name property to the ${chalk.cyan(
          'dullaghan.config.mjs'
        )} file?`
      );
      // TODO: Add link to README on repo for the config
      exit(1);
    }

    subdirectory = selectedSubdirectory;
  }

  const COMPONENT_DIRECTORY_PATH = resolve(subdirectory.path, name);

  // Build scaffold template args
  const scaffoldTemplateArgs: DullaghanCli.Scaffold.JSSTemplateArgs = {
    name,
    subdirectory,
    hasGetStaticProps: false,
    hasNextDynamic: false,
    hasPlaceholder: false,
  };

  // Get the scaffold options for JSS projects
  if (config.projectType === 'JSS') {
    const {
      scaffoldOptSelections,
    }: { scaffoldOptSelections: DullaghanCli.Scaffold.CliUserOptions[] } = await inquirer.prompt([
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

    scaffoldOptSelections.forEach((key) => {
      scaffoldTemplateArgs[key] = true;
    });
  }

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

  const writeTemplateFile = async (
    templateName: string,
    template: DullaghanCli.Scaffold.Template | DullaghanCli.Scaffold.JSSTemplate
  ) => {
    const fileName = templateName.replace(/(\[name\])/g, name);
    const filePath = resolve(COMPONENT_DIRECTORY_PATH, fileName);
    if (fs.existsSync(filePath)) {
      const { overwriteFile } = await inquirer.prompt({
        name: 'overwriteFile',
        type: 'confirm',
        message: `The file ${chalk.yellow(
          fileName
        )} already exists. Would you like to overwrite it?`,
      });

      if (!overwriteFile) {
        return Promise.resolve();
      }
    }
    const fileContents = template(scaffoldTemplateArgs);
    return fs.writeFile(filePath, fileContents, (err) => {
      if (err) {
        console.error(err);
      }
    });
  };

  const files = Object.entries(filesToCreate);

  await files.reduce((prev, curr) => {
    return prev.then(() => {
      return writeTemplateFile(curr[0], curr[1]);
    });
  }, Promise.resolve());

  // TODO: Run prettier if it's installed

  // await Promise.all(Object.entries(filesToCreate).map(([key, val]) => writeTemplateFile(key, val)));

  console.log(`
${chalk.green(name)} has been created.
`);
};
