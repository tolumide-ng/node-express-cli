const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');

const clui = require('clui');
const Spinner = clui.Spinner;

const packageSpinner = new Spinner('Instaling Packages...');
const serverSpinner = new Spinner('Instaling Packages...');

clear();

const getProjectInfo = () => {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Enter a name for the Application:',
      default: 'express-app',
    },
    {
      type: 'input',
      name: 'description',
      default: '',
      message: 'Enter a description of the repository:',
    },
    {
      type: 'input',
      name: 'author',
      default: '',
      message: 'Authors:',
    },
    {
      type: 'input',
      name: 'root',
      default: 'src',
      message: 'Enter the name of your root directory:',
      validate: function(input) {
        if (input.length < 3) {
          return 'Please your root folder name should be more than two characters';
        }
        return true;
      },
    },
  ];
  return inquirer.prompt(questions);
};

getProjectInfo().then(answers => {
  console.log(answers);

  packageSpinner.start();

  setTimeout(() => {
    packageSpinner.stop();
    console.log(chalk.blue.bold(`\tPackages successfully installed 👍`));
    console.log(
      chalk.greenBright(
        `\n\tServer is running on port 4000. Go to ${chalk.blue.bold.underline(
          'http://localhost:4000/'
        )}`
      )
    );
  }, 5000);

  const intro = () => {
    console.log(
      chalk.greenBright.bold(
        figlet.textSync('Create Server', {
          font: 'JS Stick Letters',
        })
      )
    );
    console.log(
      chalk.cyanBright(
        '\n\tA CLI Tool for building boilerplate codes for your express application'
      )
    );
    console.log(
      chalk.cyanBright(
        `\tTo Get Started ${chalk.greenBright('Follow These Instruction\n')} `
      )
    );
  };
});
