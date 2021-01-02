const { assert } = require('chai');
const request = require('supertest');
const app = require('./app');

const user = {
  email: 'juku@juurikas.ee',
  password: 'juku'
};
const wrongUser = {
  email: 'juku@juku.ee',
  password: 'juku'
};

describe('POST /api/login', function() {
  it('responds with success: true and token', async function() {
    const res = await request(app)
      .post('/api/login')
      .send(user);
    assert.equal(res.statusCode, 200);
    assert.isTrue(res.body.success);
    assert.ok(res.body.token);
  });
  it('responds with success: false and message', async function() {
    const res = await request(app)
      .post('/api/login')
      .send(wrongUser);
    assert.equal(res.statusCode, 401);
    assert.isFalse(res.body.success);
    assert.ok(res.body.message);
  });
});