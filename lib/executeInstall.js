const { exec } = require('child_process');

const devInstall =
  'npm i -D eslint-config-airbnb-base eslint nodemon supertest jest @babel/cli @babel/core @babel/node @babel/preset-env';
const depInstall = 'npm i express body-parser cors dotenv';

const executeInstall = () => {
  console.log('installing Packages...');

  exec(`${devInstall} && ${depInstall}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`output: ${stdout}`);
    console.log('server started at port 4000. go to localhost:8080');
    exec(`npm run dev`, () => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
    });
  });
};

module.exports = executeInstall;
