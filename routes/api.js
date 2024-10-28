const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninja')

router.get('/ninjas', function(req, res) {
  res.send({ type: 'GET' })
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

router.put('/ninjas/:id', function(req, res) {
  res.send({ type: 'PUT' })
})

router.delete('/ninjas/:id', async (req, res) => {
  try {
    await Ninja.findByIdAndDelete({ _id: req.params.id})
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router