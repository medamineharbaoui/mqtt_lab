import express from 'express';
import dataRoutes from './routes/dataRoutes.js';
import sequelize  from './config/database.js'; // Import Sequelize instance
import mqttClient from './scripts/mqtt_client.js';

// Create Express application
const app = express();

// Use data routes
app.use('/api', dataRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log(`Server is running on port ${PORT}`);
});
