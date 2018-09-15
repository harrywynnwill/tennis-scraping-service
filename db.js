const Sequelize = require('sequelize');
const config = require('./config.json')
const sequelize = new Sequelize(config.dbName, config.userName, config.password, {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    logging: true,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
module.exports = {
    sequelize: sequelize,
}