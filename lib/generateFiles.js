const fs = require('fs');
const helpers = require('../templates');
const execInstall = require('./executeInstall');
const { checkWriteFile, writeFile } = require('./utils');

const errorhandler = err => {
  if (err) throw err;
};

const generateFiles = project => {
  const rootFolderName = project.name
    .toLowerCase()
    .split(' ')
    .join('-');
  const packageJson = helpers.generatePackageJson(project);
  const eslint = helpers.generateEslint();
  const babel = helpers.generateBabel();
  const dotenv = helpers.generateDotEnv();
  const gitignore = helpers.generateGitIgnore();
  const server = helpers.generateServer(project.name);
  const serverIndex = helpers.generateServerIndex();
  const envConfig = helpers.generateEnvConfig();
  const rootRoute = helpers.generateRootRoute();
  const sampleRoute = helpers.generateSampleRoute();
  const sampleController = helpers.generateSampleController();
  const jestConfig = helpers.generateJestConfig();
  const welcomeTest = helpers.generateWelcomeTest(project.name);
  const sampleTest = helpers.generateSampleTest();
  const v1Index = helpers.generateV1Index();

  const filesObj = [
    { path: rootFolderName, name: '.gitignore', data: gitignore },
    { path: rootFolderName, name: '.babelrc', data: babel },
    { path: rootFolderName, name: '.env', data: dotenv },
    { path: rootFolderName, name: '.env.sample', data: '' },
    { path: rootFolderName, name: 'jest.config.js', data: jestConfig },
    { path: rootFolderName, name: '.eslintrc.js', data: eslint },
    {
      path: rootFolderName,
      name: 'package.json',
      data: packageJson,
      sync: true,
    },
    {
      path: `${rootFolderName}/${project.root}/tests`,
      name: 'welcome.spec.js',
      data: welcomeTest,
    },
    {
      path: `${rootFolderName}/${project.root}/tests`,
      name: 'sample.spec.js',
      data: sampleTest,
    },
    {
      path: `${rootFolderName}/${project.root}/config`,
      name: 'envVariables.js',
      data: envConfig,
      sync: true,
      check: true,
    },
    {
      path: `${rootFolderName}/${project.root}/controllers/sample`,
      name: 'index.js',
      data: sampleController,
      sync: true,
      check: true,
    },
    {
      path: `${rootFolderName}/${project.root}/routes/v1`,
      name: 'sample.js',
      data: sampleRoute,
      sync: true,
    },
    {
      path: `${rootFolderName}/${project.root}/routes/v1`,
      name: 'index.js',
      data: v1Index,
      sync: true,
    },
    {
      path: `${rootFolderName}/${project.root}/routes`,
      name: 'index.js',
      data: rootRoute,
      sync: true,
    },
    {
      path: `${rootFolderName}/${project.root}`,
      name: 'server.js',
      data: server,
      sync: true,
    },
    {
      path: `${rootFolderName}/${project.root}`,
      name: 'index.js',
      data: serverIndex,
      sync: true,
    },
  ];

  fs.mkdir(
    `${rootFolderName}/${project.root}/middlewares/validators`,
    { recursive: true },
    errorhandler
  );

  filesObj.forEach(({ path, name, data, sync }) => {
    if (name) {
      checkWriteFile(path, name, data, sync || false);
    } else {
      writeFile(path, data, sync || false);
    }
  });
 
  execInstall(rootFolderName)
};

module.exports = generateFiles;
