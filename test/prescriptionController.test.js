const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const server = require('../server');

//assertion style
chai.should();

chai.use(chaiHttp);

describe('Pharma API', () => {
  /**
   * Test the Get Route of Prescription
   */

  describe('GET /api/prescriptions/', () => {
    it('should GET users prescription', (done) => {
      chai
        .request(server)
        .get('/api/prescriptions')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not GET prescriptions with a wrong route', (done) => {
      chai
        .request(server)
        .get('/api/prescription') // wrong route for prescriptions
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  
  /**
   *    Test add/Create prescriptions Route
   */

  describe('POST /api/prescriptions/', () => {
    it('should Create a new Prescription', (done) => {
      const prescription = {
    "medicationName": "Asgrin",
    "dose": "250mg",
    "MRN": 547861,
    "frequency": 2,
    "duration": 10,
    "prescribersName": "Dr. Mike Frendem"
};
      chai
        .request(server)
        .post('/api/prescriptions/')
        .send(prescription)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.data.should.have.property('medicationName').eq('Asgrin');
          res.body.data.data.should.have.property('dose').eq('250mg');
          done();
        });
    });
    it('should NOt Create a new Prescription without medication Name', (done) => {
      const prescription = {
    "dose": "250mg",
    "MRN": 547861,
    "frequency": 2,
    "duration": 10,
    "prescribersName": "Dr. Mike Frendem"
};
      chai
        .request(server)
        .post('/api/prescriptions/')
        .send(prescription)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eq('Medication Name is required!');
          done();
        });
    });
  });

  // /**
  //  * Test Patch Route of medication
  //  */

  describe('PATCH /api/prescriptions/', () => {
    it('should Update an existing prescription with an ID', (done) => {
      const prescriptionID = '610adae05148f455f97f0ba5';
      const prescription = {
        medicationName: 'Adanine',
      };
      chai
        .request(server)
        .patch('/api/prescriptions/' + prescriptionID)
        .send(prescription)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.data.should.have.property('medicationName').eq('Adanine');
          done();
        });
    });
    it('should not Update a Prescription with a wrong ID', (done) => {
      const prescriptionID = '610a51565988172cc4f708389'; //unexisting ID
      const prescription = {
        medicationName: 'Adanine',
      };
      chai
        .request(server)
        .patch('/api/prescriptions/' + prescriptionID)
        .send(prescription)
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
  describe('DELETE /api/prescriptions/', () => {
    it('should DELETE an existing Prescription with an ID', (done) => {
      const prescriptionID = '610adae05148f455f97f0ba5';
      chai
        .request(server)
        .delete('/api/prescriptions/' + prescriptionID)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should NOT DELETE a Prescription with a wrong ID', (done) => {
      const prescriptionID = '6109c03e6586c5213da04c69'; // Unexisting ID
      chai
        .request(server)
        .delete('/api/prescriptions/' + prescriptionID)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.be.eq('No Document Found with the given ID');
          done();
        });
    });
  });
});
