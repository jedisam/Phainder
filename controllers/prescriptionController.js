const catchAsync = require('../utils/catchAsync');
const Prescription = require('../model/Prescription');
// const Medication = require('../model/Medication');
const AppError = require('../utils/appError');

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

exports.addPrescription = catchAsync(async (req, res, next) => {
  if (!req.body.patient) req.body.patient = req.user.id;
  const newPrescription = await Prescription.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newPrescription,
    },
  });
});

exports.updatePrescription = catchAsync(async (req, res, next) => {
  const updatePrescription = await Prescription.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatePrescription) {
    return next(new AppError('No Prescription Found with the given ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: updatePrescription,
    },
  });
});

exports.deletePrescription = catchAsync(async (req, res, next) => {
  const prescription = await Prescription.findByIdAndDelete(req.params.id);
  if (!prescription) {
    return next(new AppError('No Prescription Found with the given ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getPrescription = catchAsync(async (req, res, next) => {
  let prescription = await Prescription.findById(req.params.id);
  if (!prescription) {
    return next(new AppErroror('No prescription Found with the given ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: prescription,
    },
  });
});
