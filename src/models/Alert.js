const mongoose = require('mongoose');
const AlertSchema = new mongoose.Schema({
  city: String,
  type: String,
  timestamp: Date,
});
module.exports = mongoose.model('Alert', AlertSchema);