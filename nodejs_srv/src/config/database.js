import { Sequelize } from 'sequelize';

// Replace 'database_name', 'username', 'password', 'localhost' and 'mysql' with your MySQL database credentials
const sequelize = new Sequelize('iot_data', 'harbaoui', '12345678', {
    host: 'mysql',
    dialect: 'mysql'
});

export default sequelize;
