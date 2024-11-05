const express = require('express');
const router = express.Router();
const mainRoutes = require('./main');
const geocodingRoutes = require('./geocoding');

router.use('/main', mainRoutes);
router.use('/geocode', geocodingRoutes);

module.exports = router;