// src/routes/alertRoutes.js
const express = require('express');
const Alert = require('../models/Alert');
const router = express.Router();

router.get('/', async (req, res) => {
  const alerts = await Alert.find();
  const formattedAlerts = alerts.map(alert => ({
    _id: alert._id,
    city: alert.city,
    type: alert.type,
    alertMessage: `Alert: ${alert.type} detected in ${alert.city} at ${alert.timestamp}`,
    timestamp: alert.timestamp,
    __v: alert.__v
  }));
  res.json(formattedAlerts);
});

module.exports = router;