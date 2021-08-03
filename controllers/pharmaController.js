const catchAsync = require('../utils/catchAsync');
const Pharma = require('../model/Pharmacy');
const Medication = require('../model/Medication');

///Pharmas-within/:distance/center/:latlng

exports.getAllPharmas = catchAsync(async (req, res, next) => {
  const pharmas = await Pharma.find();
  res.status(200).json({
    status: 'success',
    results: pharmas.length,
    data: {
      data: pharmas,
    },
  });
});

exports.getPharma = catchAsync(async (req, res, next) => {
  let pharma = await Pharma.findById(req.params.id);
  if (!pharma) {
    return next(new AppError('No Pharmacy Found with the given ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: pharma,
    },
  });
});

exports.updatePharma = catchAsync(async (req, res, next) => {
  const updatedPharma = await Pharma.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedPharma) {
    return next(new AppError('No Pharmacy Found with the given ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: updatedPharma,
    },
  });
});

exports.deletePharma = catchAsync(async (req, res, next) => {
  const pharma = await Pharma.findByIdAndDelete(req.params.id);
  if (!pharma) {
    return next(new AppError('No doc Found with the given ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
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
