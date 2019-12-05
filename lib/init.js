const { getProjectInfo, intro } = require('./utils');
const generateFiles = require('./generateFiles');

const init = name => {
  intro();
  getProjectInfo(name).then(data => {
    const dataObj = { name, ...data };
    generateFiles(dataObj);
  });
};

module.exports = init;
