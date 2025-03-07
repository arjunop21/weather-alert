const mongoose = require('mongoose');
const WeatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  condition: String,
  timestamp: Date,
});
module.exports = mongoose.model('Weather', WeatherSchema);