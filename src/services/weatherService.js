const axios = require('axios');
const cron = require('node-cron');
const Weather = require('../models/Weather');
const Alert = require('../models/Alert');
const City = require('../models/City');

const fetchWeatherData = async () => {
  const cities = await City.find();
  for (const city of cities) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.API_KEY}&units=metric`
      );
      const { temp } = response.data.main;
      const condition = response.data.weather[0].main.toLowerCase();
      await Weather.create({ city: city.name, temperature: temp, condition, timestamp: new Date() });

      if (condition.includes('rain') || temp > 30 || temp < 10) {
        const alertType = condition.includes('rain') ? 'Rain' : temp > 30 ? 'High Temperature' : 'Low Temperature';
        await Alert.create({ city: city.name, type: alertType, timestamp: new Date() });
        console.log(`Alert: ${alertType} detected in ${city.name}`);
      }
    } catch (error) {
      console.error(`Error fetching data for ${city.name}:`, error.message);
    }
  }
};

const cronJob = cron.schedule('*/10 * * * *', fetchWeatherData);
module.exports = cronJob;