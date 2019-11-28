const generatePackageJson = project => `{
    "name": "${project.name}",
    "version": "1.0.0",
    "description": "${project.description}",
    "author": "${project.author}",
    "license": "MIT",
    "scripts": {
      "start": "babel-node server/index"
    }
  }
`;

const generateBabel = () => `{
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "node": "current"
          }
        }
      ]
    ]
}`;

const generateGitIgnore = () => `
node_modules/
package-lock.json
.env
`;

const generateDotEnv = () => ``;

module.exports = {
	generatePackageJson,
	generateBabel,
	generateGitIgnore,
	generateDotEnv,
};
