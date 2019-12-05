const fs = require('fs');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const { spawn } = require('child_process');

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
      '\nA CLI Tool for building boilerplate codes for your express application'
    )
  );
  console.log(
    chalk.cyanBright(
      `To Get Started ${chalk.greenBright('Follow These Instruction\n')} `
    )
  );
};

const runner = ({ command, onComplete, spinner }) => {
  spinner.start();

  return new Promise(res => {
    // create a new child process command
    const newProcess = spawn(command, { shell: true });

    //listen to every data stream
    newProcess.stdout.on('data', data => {
      spinner.stop(); // stop spinner before printing output
      console.log(`${data}`);
    });

    // on exit listener
    newProcess.on('exit', () => {
      onComplete && onComplete(); // if oncomplete function is given run it
      res(); // resolve promise
    });
  });
};

const getProjectInfo = name => {
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
      default: 'An express app',
      message: 'Enter a description of the Application:',
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
  if (name) questions.splice(0, 1);
  return inquirer.prompt(questions);
};

const packageComplete = () =>
  console.log(chalk.blue.bold(`Packages successfully installed 👍`));

const writeFile = (path, data, sync = false) => {
  if (sync) {
    fs.writeFileSync(path, data, { flag: 'w' });
  }
  fs.writeFile(path, data, { flag: 'w' }, err => {
    if (err) throw err;
  });
};

const checkWriteFile = (path, name, dataStr, sync = false) => {
  if (!fs.existsSync(path)) {
    fs.mkdir(path, { recursive: true }, (err, data) => {
      if (err) throw err;
      writeFile(`${path}/${name}`, dataStr, sync);
    });
  } else {
    writeFile(`${path}/${name}`, dataStr, sync);
  }
};

module.exports = {
  writeFile,
  checkWriteFile,
  runner,
  getProjectInfo,
  intro,
  packageComplete,
};
