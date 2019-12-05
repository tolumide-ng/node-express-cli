const clui = require('clui');
const { runner, packageComplete } = require('./utils');

const Spinner = clui.Spinner;

const devSpinner = new Spinner('Instaling dev dependencies...');
const depSpinner = new Spinner('Instaling dependencies...');
const serverSpinner = new Spinner('Starting development server...');

const devInstall =
  'npm i -D eslint-config-airbnb-base eslint nodemon supertest jest @babel/cli @babel/core @babel/node @babel/preset-env';
const depInstall = 'npm i express body-parser cors dotenv';

const executeInstall = (root) => {
 //install dev dependencies
  runner({ command: `cd ${root} && ${devInstall}`, spinner: devSpinner }).then(() => {
    // then install dependencies
    runner({
      command: `cd ${root} && ${depInstall}`,
      spinner: depSpinner,
      onComplete: packageComplete,
    })
  });
};

module.exports = executeInstall;
