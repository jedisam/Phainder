const express = require('express');

const {
  getPharmasWithin,
  getDistances,
  getPharmas,
  createPharmacy
} = require('../../controllers/pharmaController');

const { protect } = require('../../controllers/authController');

const router = express.Router();

router.route('/').get(getPharmas).post(protect, createPharmacy);

router.route('/pharmas-within/:distance/center/:latlng').get(getPharmasWithin);

router.route('/distances/:latlng').get(getDistances);

module.exports = router;
