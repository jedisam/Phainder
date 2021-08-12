const catchAsync = require('../utils/catchAsync');
const Pharma = require('../model/Pharmacy');
const Medication = require('../model/Medication');
const factory = require('./handleFactory.js');
const AppError = require('../utils/appError');


exports.getAllPharmas = factory.getAll(Pharma);
exports.getPharma = factory.getOne(Pharma, { path: 'medications' });
exports.updatePharma = factory.updateOne(Pharma);
exports.deletePharma = factory.deleteOne(Pharma);
exports.createPharmacy = factory.createOne(Pharma);

///Pharmas-within/:distance/center/:latlng

exports.getPharmasWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = distance / 6378.1;
  console.log('Radius: ', radius);
  if (!lat || !lng)
    return new AppError(
      'Please provide latitiude and longitude in the format lat, lng',
      400
    );

  const pharmas = await Pharma.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lat, lng], radius],
      },
    },
  });

  res.status(200).json({
    status: 'success',
    results: pharmas.length,
    data: {
      data: pharmas,
    },
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng } = req.params;
  const [lat, lng] = latlng.split(',');

  if (!lat || !lng)
    return new AppError(
      'Please provide latitiude and longitude in the format lat, lng',
      400
    );

  const distances = await Pharma.aggregate([
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
    {
      $project: {
        distance: 1,
        name: 1,
        address: 1,
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
});

exports.getMedPharmaDistances = catchAsync(async (req, res, next) => {
  const { latlng } = req.params;
  const [lat, lng] = latlng.split(',');
  const { drug } = req.params;
  // const lat = 8.998992;
  // const lng = 38.807285;

  if (!lat || !lng)
    return new AppError(
      'Please provide latitiude and longitude in the format lat, lng',
      400
    );

  const distances = await Pharma.aggregate([
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
    {
      $project: {
        distance: 1,
        name: 1,
        address: 1,
      },
    },
    {
      $lookup: {
        from: 'medications',
        localField: '_id',
        foreignField: 'pharmacy',
        as: 'Medication',
      },
    },
    {
      $unwind: '$Medication',
    },
    {
      $match: { 'Medication.name': drug },
    },
    {
      $sort: { 'Medication.price': 1 },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
});
