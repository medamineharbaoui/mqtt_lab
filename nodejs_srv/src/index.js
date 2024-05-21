import express from 'express';
import cors from 'cors';
import dataRoutes from './routes/dataRoutes.js';
import sequelize  from './config/database.js';
import mqttClient from './scripts/mqtt_client.js';


// Create Express application
const app = express();

// for local running Use CORS middleware to allow requests from specific origins
app.use(cors({
    origin: 'http://localhost:4000', 
  }));

// for running in containers
//app.use(cors({
  //  origin: 'http://4000:80', // React app service name and port in Docker network
//}));  

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
