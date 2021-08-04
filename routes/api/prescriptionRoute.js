const express = require('express');
const {
  getMyPrescriptions,
  addPrescription,
  updatePrescription,
  deletePrescription,
  getPrescription,
} = require('../../controllers/prescriptionController');
const { protect, restrictTo } = require('../../controllers/authController');

const router = express.Router();

router.use(protect);
router.route('/').get(getMyPrescriptions).post(protect, addPrescription);
router.use(restrictTo('admin', 'user'));
router
  .route('/:id')
  .get(getPrescription)
  .patch(updatePrescription)
  .delete(deletePrescription);

module.exports = router;
