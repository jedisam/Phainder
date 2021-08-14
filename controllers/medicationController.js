const catchAsync = require('../utils/catchAsync');
const Pharma = require('../model/Pharmacy');
const factory = require('./handleFactory.js');
const Medication = require('../model/Medication');

exports.setPharmaId = (req, res, next) => {
  // Allow nested route
  if (!req.body.pharmacy) req.body.pharmacy = req.params.pharmaId;
  next();
};
exports.addMedication = factory.createOne(Medication);
exports.deleteMedication = factory.deleteOne(Medication);
exports.updateMedication = factory.updateOne(Medication);
exports.getMedication = factory.getOne(Medication);
exports.getAllMedications = factory.getAll(Medication);
