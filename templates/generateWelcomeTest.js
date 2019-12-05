module.exports = (name) => `import supertest from 'supertest';
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
`