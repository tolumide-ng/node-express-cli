const template = require('../templates/index');

describe('Test Template', () => {
    test('bable template',  () => {
      expect(template.generateBabel()).toMatchSnapshot();
    });
    test('Env template',  () => {
      expect(template.generateDotEnv()).toMatchSnapshot();
    });
    test('ESlint template',  () => {
      expect(template.generateEslint()).toMatchSnapshot();
    });
    test('GitIgnore template',  () => {
      expect(template.generateGitIgnore()).toMatchSnapshot();
    });
    test('JestConfig template',  () => {
      expect(template.generateJestConfig()).toMatchSnapshot();
    });
    test('Package.json template',  () => {
        const package_info= {
            name: 'express',
            description: 'amazing app',
            author: 'angelo',
            root: 'src'
        }
      expect(template.generatePackageJson(package_info)).toMatchSnapshot();
    });
    test('RootRoute template',  () => {
      expect(template.generateRootRoute()).toMatchSnapshot();
    });
    test('Sample controller template',  () => {
      expect(template.generateSampleController()).toMatchSnapshot();
    });
    test('Sample Route template',  () => {
      expect(template.generateSampleRoute()).toMatchSnapshot();
    });
    test('Sample Test template',  () => {
      expect(template.generateSampleTest()).toMatchSnapshot();
    });
    test('server Test template',  () => {
      expect(template.generateServer()).toMatchSnapshot();
    });
    test('server Index template',  () => {
      expect(template.generateServerIndex()).toMatchSnapshot();
    });
    test('v1 Index template',  () => {
      expect(template.generateV1Index()).toMatchSnapshot();
    });
    test('welcome template',  () => {
      expect(template.generateWelcomeTest()).toMatchSnapshot();
    });
    test('Env Config Template',  () => {
      expect(template.generateEnvConfig()).toMatchSnapshot();
    });
});