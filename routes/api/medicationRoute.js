const express = require('express');
const {
 addMedication
} = require('../../controllers/medicationController');
const { protect } = require('../../controllers/authController');


const router = express.Router();

router.use(protect)

router.route('/').post(addMedication);


module.exports = router;
