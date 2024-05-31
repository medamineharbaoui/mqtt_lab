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