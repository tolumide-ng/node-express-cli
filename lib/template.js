const generatePackageJson = project => `{
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
node_modules
*.env
coverage
dist
`;

const generateDotEnv = () => ``;

const generateSampleRoute = () => `import express from 'express';
import Sample from '../../controllers/sample';

const router = express.Router();

router.get(
  '/',
  Sample.dummyRoute
);

export default router;
`;

const generateSampleController = () => `
export default {
  dummyRoute: (req, res) => {
    return res.status(200).json({
      message: 'This is a sample route',
    });
  }
};

`;

const generateJestConfig = () => `module.exports = {
  testPathIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'node',
};
`;

const generateEslint = () => `module.exports = {
    root: true,
    extends: ['airbnb-base']
    env: {
        node: true,
        es6: true,
        mocha: true
    },
    rules: {
        'one-var': 0,
        'linebreak-style': 0,
        'one-var-declaration-per-line': 0,
        'new-cap': 0,
        indent: ['error', 4],
        'consistent-return': 0,
        'no-param-reassign': 0,
        'comma-dangle': 0,
        curly: ['error', 'multi-line'],
        'import/no-unresolved': [2, { commonjs: true }],
        'no-shadow': ['error', { allow: ['req', 'res', 'err'] }],
    }
};
`;

generateServerIndex = () => `import { app } from './server.js';
import { PORT } from './config/envVariables';

let port = PORT || 4000;
app.listen(port, () => {
  console.log(${'`Server is running on port ${port}`'});
});

export default app;
`;

const generateServer = name => `import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Routes from './routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  if (err) {
    res.status(400).json({ error: 'Invalid Request data' });
  } else {
    next();
  }
});

Routes(app);

app.get('/', (req, res) => res.status(200).json({
  message: "Welcome to ${name}"
}));

app.use((req, res) => res.status(404).json({
  status: 404,
  error: ${'`Route ${req.url} Not found`'}
}));

export { app };
`;

const generateEnvConfig = () => `import dotenv from 'dotenv';
dotenv.config();

export const  { PORT, NODE_ENV } = process.env;
`;

const generateRootRoute = () => `import v1 from './v1';

export default (app) => {
  app.use('/api/v1', v1);
};
`;

const generateWelcomeTest = (name) => `import supertest from 'supertest';
import { app } from '../server.js';

const server = supertest(app);

describe('GET Welcome message /', () => {
  test('should send a welcome message on root route', async done => {
    const res = await server.get('/');
  
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('Welcome to ${name}');
    done();
  });

  test('should return a 404 status on a route that does not exist', async done => {
    const res = await server.get('/api/invalid');

    expect(res.status).toBe(404);
    expect(res.body.error).toEqual('Route /api/invalid Not found');
    done();
  });
});
`;
const generateSampleTest = (name) => `import supertest from 'supertest';
import { app } from '../server.js';

const server = supertest(app);

describe('GET Sample message /', () => {
  test('should get a sample message from sample rout', async done => {
    const res = await server.get('/api/v1/sample');
  
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('This is a sample route');
    done();
  });
});
`;

const generateV1Index = () => `import express from 'express';
import sample from './sample';

const router = express.Router();

router.use('/sample', sample);

export default router;
`

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
  generateV1Index
};
