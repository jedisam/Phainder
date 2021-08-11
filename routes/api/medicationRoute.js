const express = require('express');
const {
  addMedication,
  getAllMedications,
  getMedication,
  updateMedication,
  deleteMedication,
  setPharmaId,
  getMedPharma,
} = require('../../controllers/medicationController');
const { protect, restrictTo } = require('../../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/med-pharma/:drug').get(getMedPharma)

router
  .route('/')
  .get(getAllMedications)
  .post(protect, setPharmaId, addMedication);
router
  .route('/:id')
  .get(getMedication)
  .patch(
    protect,
    restrictTo('admin', 'pharmacist'),
    setPharmaId,
    updateMedication
  )
  .delete(protect, restrictTo('admin', 'pharmacist'), deleteMedication);

module.exports = router;
