import { connect } from 'mqtt';
import SensorData from '../models/SensorData.js';

// Connect to MQTT broker
const client = connect('mqtt://broker.hivemq.com'); 
console.log('connected to the MQTT broker');

// Subscribe to the topic where your IoT device publishes data
const topic = 'Tempdata';
client.subscribe(topic, (err) => {
    if (err) {
        console.error('Failed to subscribe to topic', err);
    } else {
        console.log('Subscribed to topic:', topic);
    }
});

// Handle incoming messages
client.on('message', async (topic, message) => {
    console.log('Received message on topic:', topic, 'with payload:', message.toString());

    // Split the incoming message by comma to extract temperature and humidity
    const [temperature, humidity] = message.toString().split(',');

    // Check if both temperature and humidity are valid numbers
    if (!isNaN(temperature) && !isNaN(humidity)) {
        try {
            // Create an instance of the SensorData model and save it to the database
            await SensorData.create({
                temperature: parseFloat(temperature),
                humidity: parseFloat(humidity)
            });
            console.log('Data inserted successfully into the database');
        } catch (error) {
            console.error('Error inserting data into the database:', error);
        }
    } else {
        console.error('Invalid temperature or humidity value');
    }
});

// Handle errors
client.on('error', (err) => {
    console.error('MQTT client error:', err);
    client.end();
});

// Close MQTT connection when the script exits
process.on('SIGINT', () => {
    console.log('Closing MQTT connection...');
    client.end();
    process.exit();
});

export default client;
