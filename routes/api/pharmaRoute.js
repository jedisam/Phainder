const express = require('express');

const {
  getPharmasWithin,
  getDistances,
  getAllPharmas,
  createPharmacy,
  getPharma,
  updatePharma,
} = require('../../controllers/pharmaController');
const medicationRouter = require('./medicationRoute');
const { protect, restrictTo } = require('../../controllers/authController');

const router = express.Router();

router.use('/:pharmaId/medications', medicationRouter);

router.route('/').get(getAllPharmas).post(protect, createPharmacy);
router
  .route('/:id')
  .get(getPharma)
  .patch(protect, restrictTo('admin', 'pharmacist'), updatePharma)
  .delete(protect, restrictTo('admin', 'pharmacist'), deletePharma);

router.route('/pharmas-within/:distance/center/:latlng').get(getPharmasWithin);

router.route('/distances/:latlng').get(getDistances);

module.exports = router;
