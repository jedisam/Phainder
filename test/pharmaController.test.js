const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const mocha = require('mocha');
const server = require('../server');

//assertion style
chai.should();

chai.use(chaiHttp);

describe('Pharma API', () => {
  /**
   * Test the Get Route
   */

  describe('/api/pharmas/', () => {
    it('should GET all the Pharmas', (done) => {
      chai
        .request(server)
        .get('/api/pharmas')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not GET all the Pharmas', (done) => {
      chai
        .request(server)
        .get('/api/pharma')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
