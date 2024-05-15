import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SensorData = sequelize.define('SensorData', {
    temperature: {
        type: DataTypes.FLOAT
    },
    humidity: {
        type: DataTypes.FLOAT
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

export default SensorData;
