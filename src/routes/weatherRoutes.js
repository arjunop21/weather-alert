const express = require('express');
const Weather = require('../models/Weather');
const router = express.Router();
router.get('/', async (req, res) => {
  const weatherData = await Weather.find();
  res.json(weatherData);
});
module.exports = router;