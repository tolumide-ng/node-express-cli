const fs = require('fs');
const helpers = require('./template');
const execInstall = require('./executeInstall');
const { checkWriteFile, writeFile } = require('./utils');

const errorhandler = err => {
  if (err) throw err;
};

const generateFiles = project => {
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
    { path: '.gitignore', data: gitignore },
    { path: '.babelrc', data: babel },
    { path: '.env', data: dotenv },
    { path: '.env.sample', data: '' },
    { path: 'jest.config.js', data: jestConfig },
    { path: '.eslintrc.js', data: eslint },
    { path: 'package.json', data: packageJson, sync: true },
    {
      path: `${project.root}/tests`,
      name: 'welcome.spec.js',
      data: welcomeTest,
    },
    {
        path: `${project.root}/tests`,
        name: 'sample.spec.js',
        data: sampleTest,
      },
    {
      path: `${project.root}/config`,
      name: 'envVariables.js',
      data: envConfig,
      sync: true,
      check: true,
    },
    {
      path: `${project.root}/controllers/sample`,
      name: 'index.js',
      data: sampleController,
      sync: true,
      check: true,
    },
    {
      path: `${project.root}/routes/v1`,
      name: 'sample.js',
      data: sampleRoute,
      sync: true,
    },
    {
      path: `${project.root}/routes/v1`,
      name: 'index.js',
      data: v1Index,
      sync: true,
    },
    {
      path: `${project.root}/routes`,
      name: 'index.js',
      data: rootRoute,
      sync: true,
    },
    {
      path: `${project.root}`,
      name: 'server.js',
      data: server,
      sync: true,
    },
    {
      path: `${project.root}`,
      name: 'index.js',
      data: serverIndex,
      sync: true,
    },
  ];
 
  fs.mkdir(
    `${project.root}/middlewares/validators`,
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

 execInstall()
};

module.exports = generateFiles;
