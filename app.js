const axios = require('axios');
var {
    hasPlayerWon
} = require('./scoreLogic');

const {
    publish,
    subscribeToEventID,
    // eventID
} = require('./nats.js')
var NATS = require('nats');
var nats = NATS.connect();

nats.subscribe('eventID', function (msg) {
    eventID = msg
})

const URL = `https://ips.betfair.com/inplayservice/v1/scores?regionCode=UK&_ak=dyMLAanpRyIsjkpJ&alt=json&locale=en_GB&eventIds=28893913%2C28893918%2C28893913&ts=1536595908118&xsrftoken=6c1f8131-b41f-11e8-b56c-a0369f0e8798`
let score = {
    home: "0",
    away: "0"
}

async function getScore(score) {
    console.log(score)

    return await axios.get(URL)
        .then(response => {
            let presentScore = response.data[0]
            console.log(presentScore)
            publishScoreUpdate(score, presentScore)

        })
        .catch(error => {
            console.log(error);
        });
}

function publishScoreUpdate(pastScore, presentScore) {
    let presentScoreHome = presentScore.score.home.score
    let presentScoreAway = presentScore.score.away.score
    console.log("present home", presentScoreHome)
    console.log("present away", presentScoreAway)
    if (hasPlayerWon(pastScore.home, presentScoreHome)) {
        console.log("home Player Wins")
        nats.publish('home-point', presentScoreHome)
    }
    if (hasPlayerWon(pastScore.away, presentScoreAway)) {
        console.log("away Player Wins")
        nats.publish('away-point', presentScoreAway)

    }
    //Update score object to latest score.
    score.home = presentScore.score.home.score
    score.away = presentScore.score.away.score
}

function pollScore() {
    result = setInterval(() => getScore(score), 1000 * 5);
}


pollScore()

module.exports = score