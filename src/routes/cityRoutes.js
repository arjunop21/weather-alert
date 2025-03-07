const express = require('express');
const City = require('../models/City');
const router = express.Router();
router.post('/', async (req, res) => {
  const city = await City.create(req.body);
  res.json(city);
});
router.delete('/:city', async (req, res) => {
  await City.deleteOne({ name: req.params.city });
  res.json({ message: 'City removed' });
});
module.exports = router;