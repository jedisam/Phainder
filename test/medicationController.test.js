const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const { setPharmaId } = require('../controllers/medicationController');
const server = require('../server');

//assertion style
chai.should();

chai.use(chaiHttp);

describe('Pharma API', () => {
  /**
   * Test the Get Route of medications
   */

  describe('GET /api/medications/', () => {
    it('should GET all the Medications', (done) => {
      chai
        .request(server)
        .get('/api/medications')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not GET Medications', (done) => {
      chai
        .request(server)
        .get('/api/medication') // wrong route for medications
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  /**
   * Test the Get a single Medication Route
   */
  describe('GET /api/medications/ a specific medication/Drug ', () => {
    it('should GET a medication by iD', (done) => {
      const medID = '610a51565988172cc4f70838';
      chai
        .request(server)
        .get('/api/pharmas/' + medID)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.data.should.have.property('_id');
          res.body.data.data.should.have.property('available');
          res.body.data.data.should.have.property('pharmacy');
          res.body.data.data.should.have.property('name');
          res.body.data.data.should.have.property('price');
          done();
        });
    });

    it('should Not GET a Medication with the wrong ID', (done) => {
      const medID = '6109c03e6586c5213da04c60'; // Incorrect ID
      chai
        .request(server)
        .get('/api/pharmas/' + medID)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.message.should.be.eq('No Document Found with the given ID');
          done();
        });
    });
  });

  /**
   *    Test add/Create Medication Route
   */

  describe('POST /api/medications/', () => {
    it('should Create a new medication', (done) => {
      const medication = {
    "pharmacy": "6109bfcf6586c5213da04c5a",
    "name": "Qbrelis",
    "available": true,
    "price": 77
};
      chai
        .request(server)
        .post('/api/medications/')
        .send(medication)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.data.should.have.property('name').eq('Qbrelis');
          res.body.data.data.should.have.property('available').eq(true);
          done();
        });
    });
    it('should NOt Create a new medication without a name', (done) => {
      const medication = {
    "pharmacy": "6109bfcf6586c5213da04c5a",
    "available": true,
    "price": 77
};
      chai
        .request(server)
        .post('/api/medications/')
        .send(medication)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eq('Name of the medication is required!');
          done();
        });
    });
  });

  // /**
  //  * Test Patch Route of medication
  //  */

  describe('PATCH /api/medications/', () => {
    it('should Update an existing medication with an ID', (done) => {
      const medID = '610a51565988172cc4f70838';
      const medication = {
        name: 'Adanine',
      };
      chai
        .request(server)
        .patch('/api/medications/' + medID)
        .send(medication)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.data.should.have.property('name').eq('Adanine');
          done();
        });
    });
    it('should not Update a Medication with a wrong ID', (done) => {
      const medID = '610a51565988172cc4f708389'; //unexisting ID
      const medication = {
        name: 'Adanine',
      };
      chai
        .request(server)
        .patch('/api/medications/' + medID)
        .send(medication)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.be.eq('No Document Found with the given ID');
          done();
        });
    });
  });

  // /**
  //  * TEST DELETE ROUTE
  //  */
  describe('DELETE /api/medications/', () => {
    it('should DELETE an existing Medication with an ID', (done) => {
      const medID = '610a51565988172cc4f70838';
      chai
        .request(server)
        .delete('/api/medications/' + medID)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should NOT DELETE a Medication with a wrong ID', (done) => {
      const medID = '6109c03e6586c5213da04c69'; // Unexisting ID
      chai
        .request(server)
        .delete('/api/medications/' + medID)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.be.eq('No Document Found with the given ID');
          done();
        });
    });
  });
});
