const express = require('express');
const {
  getPharmasWithin,
  getDistances,
} = require('../../controllers/userController');
const { protect, restrictTo } = require('../../controllers/authController');
// const reviewRouter = require('./reviewRoute');

const router = express.Router();

router.route('/').get((req, res, next) => {
  res.send('<h1>USER ROUTE</h1>')
})

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getPharmasWithin);

router.route('/distances/:latlng').get(getDistances);

module.exports = router;
