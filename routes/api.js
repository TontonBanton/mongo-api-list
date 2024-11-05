const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninja')
const axios = require('axios');


router.get('/ninjas', async (req, res) => {
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


    //FINISH THIS GEOCODING USING OPENCAGE
    const apiKey = '14ac98c0d4c64d8a831d50188a19d83c';
    const geoResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`);
    const country = geoResponse.data.results[0]?.components.country || 'Unknown';

    console.log('ninjas', ninjas)
    console.log('country', country)
    //res.json(ninjas);
    res.json({ ninjas, country });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/ninjas', async (req, res, next) => {
  const newNinja = new Ninja(req.body);
  try {
    const savedNinja = await newNinja.save();
    res.status(201).json(savedNinja);
  } catch (error) {
    next(error)
  }
})

router.put('/ninjas/:id', async (req, res) => {
  try {
    const updatedNinja = await Ninja.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNinja);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/ninjas/:id', async (req, res) => {
  try {
    await Ninja.findByIdAndDelete({ _id: req.params.id})
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.get('/ninjas', async (req, res) => {
//   try {
//     const ninjas = await Ninja.find();
//     res.json(ninjas);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// })

module.exports = router