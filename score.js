const db = require('./db.js')
const Sequelize = require('sequelize');

const Score = db.sequelize.define('score', {
    home: {
        type: Sequelize.STRING
    },
    away: {
        type: Sequelize.STRING
    },
    eventID: {
        type: Sequelize.INTEGER
    },
    jsonObject:{
        type: Sequelize.JSON
    }
});

Score.sync({
    force: true
})
module.exports = Score