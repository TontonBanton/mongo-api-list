const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninja')
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const maxDistance = parseFloat(req.query.range) || 1000000;

    const ninjas = await Ninja.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          distanceField: 'distance',
          maxDistance: maxDistance,
          spherical: true
        }
      }
    ]);
    //GEOCODING USING OPENCAGE
    const apiKey = '14ac98c0d4c64d8a831d50188a19d83c';
    const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`)

    //const region = geoResponse.data.results[0]?.components.state || geoResponse.data.results[0]?.components.region || 'Unknown Region';
    //const country = geoResponse.data.results[0]?.components.country || 'Unknown Country';
    //const location = `${region}, ${country}`;

    const formattedAddress = geoResponse.data.results[0]?.formatted || 'Unknown Address';
    const location = `${formattedAddress}`;
    res.json({ ninjas, location });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router