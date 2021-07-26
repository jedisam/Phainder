const catchAsync = require('../utils/catchAsync');
const Pharmas = require('../model/Pharmacy');
const Medication = require('../model/Medication');

///Pharmas-within/:distance/center/:latlng

exports.getPharmas = catchAsync(async (req, res, next) => {
  const pharmas = await Pharmas.find();
  res.status(200).json({
    status: 'success',
    results: pharmas.length,
    data: {
      data: pharmas,
    },
  });
});

exports.createPharmacy = catchAsync(async (req, res, next) => {
  const newPharma = await Pharma.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: newPharma,
    },
  });
});

exports.getPharmasWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = distance / 6378.1;

  if (!lat || !lng)
    return new AppError(
      'Please provide latitiude and longitude in the format lat, lng',
      400
    );

  const pharmas = await Pharmas.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
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

  const distances = Pharmas.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: 0.001,
      },
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    results: distances.length,
    data: {
      data: distances,
    },
  });
});
