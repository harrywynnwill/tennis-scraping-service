const db = require('./db.js')
const Sequelize = require('sequelize');

const Score = db.sequelize.define('score', {
    homePlayer: {
        type: Sequelize.INTEGER
    },
    awayPlayer: {
        type: Sequelize.INTEGER
    },
    homePoints: {
        type: Sequelize.STRING
    },
    awayPoints: {
        type: Sequelize.STRING
    },
    homeGames: {
        type: Sequelize.STRING
    },
    awayGames: {
        type: Sequelize.STRING
    },
    homeSets: {
        type: Sequelize.STRING
    },
    awaySets: {
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