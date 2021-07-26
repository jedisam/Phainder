const express = require('express');

const {
    getPharmasWithin,
    getDistances,
} = require('../../controllers/pharmaController');

const router = express.Router();






router
  .route('/pharmas-within/:distance/center/:latlng')
  .get(getPharmasWithin);

router.route('/distances/:latlng').get(getDistances);


module.exports = router;