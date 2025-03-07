const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const weatherRoutes = require('./routes/weatherRoutes');
const alertRoutes = require('./routes/alertRoutes');
const cityRoutes = require('./routes/cityRoutes');
const cronJob = require('./services/weatherService');

dotenv.config();
const app = express();

connectDB(); // Connect to database
app.use(express.json());

// Routes
app.use('/weather', weatherRoutes);
app.use('/alerts', alertRoutes);
app.use('/cities', cityRoutes);

cronJob.start(); // Start scheduled job

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// MONGO_URI=your_mongodb_uri
// API_KEY=your_openweathermap_api_key
// PORT=5000