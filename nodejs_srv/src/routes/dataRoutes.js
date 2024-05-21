import { Router } from 'express';
const router = Router();
import SensorData from '../models/SensorData.js';


// Endpoint to fetch current data
router.get('/current-data', async (req, res) => {
    try {
        // Query the database for the most recent sensor data
        const currentData = await SensorData.findOne({
            order: [['createdAt', 'DESC']]
        });
        
        res.json(currentData);
    } catch (error) {
        console.error('Error fetching current data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to fetch historical data
router.get('/historical-data', async (req, res) => {
    try {
        // Query the database for historical sensor data
        const historicalData = await SensorData.findAll({
            order: [['createdAt', 'ASC']]
        });
        
        res.json(historicalData);
    } catch (error) {
        console.error('Error fetching historical data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//

export default router;


// Endpoint to fetch moving averages
/*
router.get('/moving-averages', async (req, res) => {
    try {
        // Retrieve historical data from the database
        const historicalData = await SensorData.findAll({
            attributes: ['temperature', 'humidity'],
            order: [['createdAt', 'ASC']]
        });
        
        // Calculate moving averages
        const windowSize = 5; 
        const movingAverages = {
            temperature: calculateMovingAverage(historicalData.map(data => data.temperature), windowSize),
            humidity: calculateMovingAverage(historicalData.map(data => data.humidity), windowSize)
        };
        
        res.json(movingAverages);
    } catch (error) {
        console.error('Error fetching moving averages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Function to calculate moving average
function calculateMovingAverage(data, windowSize) {
    const movingAverages = [];
    for (let i = 0; i < data.length - windowSize + 1; i++) {
        const window = data.slice(i, i + windowSize);
        const sum = window.reduce((acc, val) => acc + val, 0);
        movingAverages.push(sum / windowSize);
    }
    return movingAverages;
}
*/