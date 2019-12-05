module.exports = project => `{
    "name": "${project.name.toLowerCase().split(' ').join('-')}",
    "version": "1.0.0",
    "description": "${project.description}",
    "author": "${project.author}",
    "license": "ISC",
    "scripts": {
      "start": "npm run build && node dist/index",
      "test": "jest --detectOpenHandles --verbose --coverage --forceExit",
      "dev": "nodemon --exec babel-node ${project.root}/index",
      "build": "babel ${project.root} --copy-files --out-dir dist"
    }
  }
`