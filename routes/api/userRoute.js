const express = require('express');
const { getPharmasWithin } = require('../controllers/userController');
const { protect, restrictTo } = require('../controllers/authController');
// const reviewRouter = require('./reviewRoute');

const router = express.Router();

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getPharmasWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

module.exports = router;
