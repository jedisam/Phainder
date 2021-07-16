const Pharmas = require('../model/Pharmacy');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

///Pharmas-within/:distance/center/:latlng

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
