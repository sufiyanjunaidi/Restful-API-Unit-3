const request = require('supertest');
const app = require('./server');
const { expect } = require('chai');

describe('Todo API Tests', () => {
  let server;

  before((done) => {
    server = app.listen(3002, () => {
      console.log('Server is running on port 3002');
      done();
    });
  });

  after((done) => {
    server.close(() => {
      console.log('Server closed');
      done();
    });
  });

  describe('GET /todos', () => {
    it('should return a list of todos', async () => {
      const response = await request(server).get('/todos');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });
  });

  describe('POST /todos', () => {
    it('should create a new todo', async () => {
      const response = await request(server)
        .post('/todos')
        .send({ title: 'Test Todo' });
      expect(response.status).to.equal(201);
      expect(response.body.success).to.be.true;
    });
  });
});
