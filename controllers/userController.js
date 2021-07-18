const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../model/User')



const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const doc = await User.find();
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });


  exports.getUser = catchAsync(async (req, res, next) => {
    let user = User.findById(req.params.id);
    if (!user) {
      return next(new AppError('No Document Found with the given ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: user,
      },
    });
  });


  exports.updateUser = catchAsync(async (req, res, next) => {
    const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No Document Found with the given ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });


exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = async (req, res, next) => {
  // 1) create error if user Posts password data
  if (req.body.password || req.body.confirmpassword)
    return next(
      new AppError(
        'This route is not for passwords. please use /updateMyPassword',
        400
      )
    );
  // 2) filtered unwanted objects
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;
  // 2) update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This Route is not defined. pls use signup',
  });
};


exports.deleteUser = catchAsync(async (req, res, next) => {
    const doc = await User.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No doc Found with the given ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });