const express = require('express');
const {
  getUser,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  updateMe,
  deleteMe,
  getMe,
  // uploadUserPhoto,
  // resizeUserPhoto,
} = require('../../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
  logout,
} = require('../../controllers/authController');

const prescriptionRoute = require('./prescriptionRoute');

// const { protect, restrictTo } = require('../../controllers/authController');
// const reviewRouter = require('./reviewRoute');

const router = express.Router();

// router.use('/:userId/prescriptions', prescriptionRoute);

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.post('/forgotPassword', forgotPassword);
router.get('/resetPassword/:token', resetPassword);

router.use(protect);

router.get('/me', getMe, getUser);
router.patch('/updateMyPassword', updatePassword);
// router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
