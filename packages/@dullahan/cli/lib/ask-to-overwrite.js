const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');

const askToOverwrite = (file) => {
  const { shouldOverwrite } = await inquirer.prompt([
    {
      name: 'shouldOverwrite',
      type: 'confirm',
      message: `Overwrite ${chalk.yellow(file)}?`,
      default: true,
    },
  ]);

  if (shouldOverwrite) {
    fs.remove(file);
  }
};

module.exports = askToOverwrite;
