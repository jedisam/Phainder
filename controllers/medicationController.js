const catchAsync = require('../utils/catchAsync');
const Pharma = require('../model/Pharmacy');
const Medication = require('../model/Medication');

exports.setPharmaId = (req, res, next) => {
  // Allow nested route
  if (!req.body.pharmacy) req.body.pharmacy = req.params.pharmaId;
  next();
};

exports.addMedication = catchAsync(async (req, res, next) => {
  const newMedication = await Medication.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newMedication,
    },
  });
});

exports.deleteMedication = catchAsync(async (req, res, next) => {
  const med = await Medication.findByIdAndDelete(req.params.id);
  if (!pharma) {
    return next(new AppError('No Medication Found with the given ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateMedication = catchAsync(async (req, res, next) => {
  const updatedMedication = await Medication.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedMedication) {
    return next(new AppError('No Pharmacy Found with the given ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: updatedMedication,
    },
  });
});

exports.getMedication = catchAsync(async (req, res, next) => {
  let med = await Medication.findById(req.params.id);
  if (!med) {
    return next(new AppError('No Medication Found with the given ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: med,
    },
  });
});

exports.getAllMedications = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.pharmaId) filter = { pharmacy: req.params.pharmaId };
  const medications = await Medication.find(filter);
  res.status(200).json({
    status: 'success',
    results: medications.length,
    data: {
      data: medications,
    },
  });
});

exports.getMedPharma = catchAsync(async (req, res, next) => {
  const { drug } = req.params;
  const lat = 8.998992;
  const lng = 38.807285;

  const meds = await Medication.aggregate([
    {
      $match: { name: drug },
    },
    {
      $lookup: {
        from: 'pharmacies',
        localField: 'pharmacy',
        foreignField: '_id',
        as: 'AggPharmacy',
      },
    },
    {
      $group: {
        // _id: '$AggPharmacy',
        _id: {
          aggPharma: '$AggPharmacy',
          medName: '$name',
        },
      },
    },
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lat * 1, lng * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: 0.001,
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    //  results: medications.length,
    data: {
      data: meds,
    },
  });
});
