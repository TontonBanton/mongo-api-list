const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninja')


router.get('/ninjas', async (req, res) => {
  try {
    const ninjas = await Ninja.find();
    res.json(ninjas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

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

module.exports = router