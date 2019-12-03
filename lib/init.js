const { getProjectInfo, intro } = require('./utils');
const generateFiles = require('./generateFiles');

const init = () => {
  intro();
  getProjectInfo().then(data => {
    generateFiles(data);
  });
};

module.exports = init;
