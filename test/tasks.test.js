const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - task', () => {

  it('should fail to create a data without a key', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.status).to.equal(500);
    expect(res.body.message).to.equal('Tasks validation failed: key: Path `key` is required., value: Path `value` is required.');
  });

  it('should create a task', async () => {
    const task = {
      mykey: '1000'
    };
    const res = await request(app).post('/tasks').send(task);
    expect(res.status).to.equal(200);
  }).timeout(10000);

  it('should create a task', async () => {
    const task = {
      mykey: '1001',
      timestamp: ""
    };
    const res = await request(app).post('/tasks').send(task);
    expect(res.status).to.equal(200);
  }).timeout(10000);


  it('should find the key with timestamp', async () => {
    const res = await request(app).get('/tasks/mykey')
    console.log(res.body)
    expect(res.status).to.equal(200);
    expect(res.body.hasOwnProperty("value"));
    expect(res.body.value).to.equal('1000');

  }).timeout(10000);

  it('should find key with timestamp by matching', async () => {
    const res = await request(app).get('/tasks/mykey?timestamp=1597699017')
    console.log(res.body)
    expect(res.status).to.equal(200);
    expect(res.body.hasOwnProperty("value"));
    expect(res.body.value).to.equal('1000');
  }).timeout(10000);

  it('should find key without timestamp by non-matching', async () => {
    const res = await request(app).get('/tasks/mykey?timestamp=1597699010')
    console.log(res.body)
    expect(res.status).to.equal(200);
    expect(res.body.hasOwnProperty("value"));
    expect(res.body.value).to.equal('1001');
  }).timeout(10000);

  it('should remove all keys from tasks', async () => {
    const res = await request(app).delete('/tasks')
    expect(res.status).to.equal(200);
    expect(res.text).to.equal('all data removed');
  }).timeout(10000);

});