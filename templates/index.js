const generatePackageJson = require('./generatePackageJson');
const generateBabel = require('./generateBabel');
const generateGitIgnore = require('./generateGitIgnore');
const generateDotEnv = require('./generateDotEnv');
const generateEslint = require('./generateEslint');
const generateJestConfig = require('./generateJestConfig');
const generateServer = require('./generateServer');
const generateServerIndex = require('./generateServerIndex');
const generateEnvConfig = require('./generateEnvConfig');
const generateRootRoute = require('./generateRootRoute');
const generateWelcomeTest = require('./generateWelcomeTest');
const generateSampleTest = require('./generateSampleTest');
const generateSampleRoute = require('./generateSampleRoute');
const generateSampleController = require('./generateSampleController');
const generateV1Index = require('./generateV1Index');

module.exports = {
  generatePackageJson,
  generateBabel,
  generateGitIgnore,
  generateDotEnv,
  generateEslint,
  generateJestConfig,
  generateServer,
  generateServerIndex,
  generateEnvConfig,
  generateRootRoute,
  generateWelcomeTest,
  generateSampleTest,
  generateSampleRoute,
  generateSampleController,
  generateV1Index,
};
