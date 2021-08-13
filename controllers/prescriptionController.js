const catchAsync = require('../utils/catchAsync');
const Prescription = require('../model/Prescription');
// const Medication = require('../model/Medication');
const factory = require('./handleFactory.js');
const AppError = require('../utils/appError');

exports.setPrescriptionUserIds = (req, res, next) => {
  if (!req.body.patient) req.body.patient = req.user.id;
  next();
};

exports.getMyPrescriptions = catchAsync(async (req, res, next) => {
  const prescriptions = await Prescription.find({ patient: req.user.id });
  res.status(200).json({
    status: 'success',
    results: prescriptions.length,
    data: {
      data: prescriptions,
    },
  });
});

exports.addPrescription = factory.createOne(Prescription);
exports.updatePrescription = factory.updateOne(Prescription);
exports.deletePrescription = factory.deleteOne(Prescription);
exports.getPrescription = factory.getOne(Prescription);

