import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('iot_data', 'harbaoui', '12345678', {
    host: 'mysql',//localhost to run local //mysql to run in the container
    dialect: 'mysql'
});

export default sequelize;
