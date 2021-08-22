const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const mocha = require('mocha');
const { setPharmaId } = require('../controllers/medicationController');
const server = require('../server');

//assertion style
chai.should();

chai.use(chaiHttp);

describe('Pharma API', () => {
  /**
   * Test the Get Route
   */

  describe('GET /api/pharmas/', () => {
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
  /**
   * Test the Get a single Pharmacy Route
   */
  describe('GET /api/pharmas/ a specific Pharmacy ', () => {
    it('should GET a Pharmacy by iD', (done) => {
      const pharmaId = '6109c03e6586c5213da04c60';
      chai
        .request(server)
        .get('/api/pharmas/' + pharmaId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.data.should.have.property('_id');
          res.body.data.data.should.have.property('name');
          res.body.data.data.should.have.property('openingHour');
          res.body.data.data.should.have.property('closingHour');
          res.body.data.data.should.have.property('address');
          res.body.data.data.should.have.property('medications');
          done();
        });
    });

    it('should Not GET a Pharmacy by iD', (done) => {
      const pharmaId = '6109c03e6586c5213da04c69'; // un
      chai
        .request(server)
        .get('/api/pharmas/' + pharmaId)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.message.should.be.eq('No Document Found with the given ID');
          done();
        });
    });
  });

  /**
   *    Test add/Create Pharma Route
   */

  describe('PoST /api/pharmas/', () => {
    it('should Create a new Pharmacy', (done) => {
      const pharmacy = {
        name: 'Phar',
        openingHour: '3:00A.M',
        closingHour: '9:00P.M',
        address: 'Megenagna',
      };
      chai
        .request(server)
        .post('/api/pharmas/')
        .send(pharmacy)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.data.should.have.property('name').eq('phar');
          res.body.data.data.should.have.property('address').eq('Megenagna');
          done();
        });
    });
    it('should NOt Create a new Pharmacy without a name', (done) => {
      const pharmacy = {
        openingHour: '3:00A.M',
        closingHour: '9:00P.M',
        address: 'Megenagna',
      };
      chai
        .request(server)
        .post('/api/pharmas/')
        .send(pharmacy)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eq('Name of the Pharmacy is required!');
          done();
        });
    });
  });

  /**
   * Test Patch Route
   */

  describe('PATCH /api/pharmas/', () => {
    it('should Update an existing Pharmacy with an ID', (done) => {
      const pharmaId = '6109c03e6586c5213da04c60';
      const pharmacy = {
        name: 'Phar',
      };
      chai
        .request(server)
        .patch('/api/pharmas/' + pharmaId)
        .send(pharmacy)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.data.should.have.property('name').eq('phar');
          done();
        });
    });
    it('should not Update a Pharmacy with a wrong ID', (done) => {
      const pharmaId = '6109c03e6586c5213da04c69'; //unexisting ID
      const pharmacy = {
        name: 'Phar',
      };
      chai
        .request(server)
        .patch('/api/pharmas/' + pharmaId)
        .send(pharmacy)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.be.eq('No Document Found with the given ID');
          done();
        });
    });
  });

  /**
   * TEST DELETE ROUTE
   */
  describe('DELETE /api/pharmas/', () => {
    it('should DELETE an existing Pharmacy with an ID', (done) => {
      const pharmaId = '6109c03e6586c5213da04c60';
      chai
        .request(server)
        .delete('/api/pharmas/' + pharmaId)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should NOT DELETE a Pharmacy with a wrong ID', (done) => {
      const pharmaId = '6109c03e6586c5213da04c69'; // Unexisting ID
      chai
        .request(server)
        .delete('/api/pharmas/' + pharmaId)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.be.eq('No Document Found with the given ID');
          done();
        });
    });
  });
});
