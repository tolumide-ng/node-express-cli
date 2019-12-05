module.exports = (name) => `import supertest from 'supertest';
import { app } from '../server.js';

const server = supertest(app);

describe('GET Sample message /', () => {
  test('should get a sample message from sample route', async done => {
    const res = await server.get('/api/v1/sample');
  
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('This is a sample route');
    done();
  });
});
`