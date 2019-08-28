const { describe, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
chai.use(chaiHttp);
const { expect } = chai;

describe('Interest', () => {
  it('should calculate the interest rate', async () => {
    const input = {
      subscription: 1000,
      tenor: 12,
      interest: 12
    };
    const res = await chai
      .request(app)
      .post('/calculate')
      .send(input);
    expect(res.status).to.equal(200);
    expect(res.text).to.be.a('string');
  });
  it('should return an error if subscription is not provided', async () => {
    const input = {
      subscription: '',
      tenor: '12',
      interest: '12'
    };
    const res = await chai
      .request(app)
      .post('/calculate')
      .send(input);
    expect(res.status).to.equal(400);
    expect(res.text).to.equal('Subscription is required');
    expect(res.body).to.eql({});
  });
  it('should return an error if tenor is not provided', async () => {
    const input = {
      subscription: '1000',
      tenor: '',
      interest: '12'
    };
    const res = await chai
      .request(app)
      .post('/calculate')
      .send(input);
    expect(res.status).to.equal(400);
    expect(res.text).to.equal('Tenor is required');
    expect(res.body).to.eql({});
  });
  it('should return an error if interest is not provided', async () => {
    const input = {
      subscription: '1000',
      tenor: '12',
      interest: ''
    };
    const res = await chai
      .request(app)
      .post('/calculate')
      .send(input);
    expect(res.status).to.equal(400);
    expect(res.text).to.equal('Interest is required');
    expect(res.body).to.eql({});
  });
});
