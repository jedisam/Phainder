const express = require('express');

const {
  getPharmasWithin,
  getDistances,
  getAllPharmas,
  createPharmacy,
  getPharma
  updatePharma,
} = require('../../controllers/pharmaController');

const { protect, restrictTo } = require('../../controllers/authController');

const router = express.Router();

router.route('/').get(getAllPharmas).post(protect, createPharmacy);
router
  .route('/:id')
  .get(getPharma)
  .patch(protect, restrictTo('admin', 'pharmacist'), updatePharma).delete(protect, restrictTo('admin', 'pharmacist'), deletePharma);

router.route('/pharmas-within/:distance/center/:latlng').get(getPharmasWithin);

router.route('/distances/:latlng').get(getDistances);

module.exports = router;
