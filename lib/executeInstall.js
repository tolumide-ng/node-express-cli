const clui = require('clui');
const { runner, packageComplete } = require('./utils');

const Spinner = clui.Spinner;

const devSpinner = new Spinner('Instaling dev dependencies...');
const depSpinner = new Spinner('Instaling dependencies...');
const serverSpinner = new Spinner('Starting development server...');

const devInstall =
  'npm i -D eslint-config-airbnb-base eslint nodemon supertest jest @babel/cli @babel/core @babel/node @babel/preset-env';
const depInstall = 'npm i express body-parser cors dotenv';

const executeInstall = () => {
  // install dev dependencies
  runner({ command: devInstall, spinner: devSpinner }).then(() => {
    // then install dependencies
    runner({
      command: depInstall,
      spinner: depSpinner,
      onComplete: packageComplete,
    }).then(() => {
      // then start dev server
      runner({
        command: 'npm run dev',
        spinner: serverSpinner,
      });
    });
  });
};

module.exports = executeInstall;
