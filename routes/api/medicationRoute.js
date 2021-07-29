const express = require('express');
const {
  addMedication,
  getAllMedications,
  getMedication,
  getMedication,
  updateMedication,
  deleteMedication,
} = require('../../controllers/medicationController');
const { protect, restrictTo } = require('../../controllers/authController');

const router = express.Router();

router.use(protect);

router.route('/').get(getAllMedications).post(protect, addMedication);
router
  .route('/:id')
  .get(getMedication)
  .patch(protect, restrictTo('admin', 'pharmacist'), updateMedication)
  .delete(protect, restrictTo('admin', 'pharmacist'), deleteMedication);

module.exports = router;
