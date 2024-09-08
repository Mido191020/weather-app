const axios = require('axios');

const API_KEY = "NQGZVJDVEW3CW5NY96M4EKWN7";

const fetchWeatherData = async (city, unit) => {
    const BASE_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}`;

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                unitGroup: unit === 'imperial' ? 'us' : 'metric',
                key: API_KEY,
                contentType: 'json'
            }
        });
        
        const data = response.data;
        
        // Format the data to match your existing structure
        return {
            name: data.address,
            main: {
                temp: data.currentConditions.temp
            },
            weather: [{
                description: data.currentConditions.conditions
            }]
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

exports.getData = async (req, res) => {
    const city = req.query.city;
    const unit = req.query.unit || 'metric';
    
    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }
    
    try {
        const data = await fetchWeatherData(city, unit);
        res.render('weather', { weather: data, unit });
    } catch (error) {
        console.error('Detailed error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};