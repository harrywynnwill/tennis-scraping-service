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

const URL = ` https://ips.betfair.com/inplayservice/v1/scores?regionCode=UK&_ak=dyMLAanpRyIsjkpJ&alt=json&locale=en_GB&eventIds=28891010%2C28894608%2C28892832&ts=1536514210189&xsrftoken=ff220691-b430-11e8-8e56-ecf4bbd60988`
let score = {
    home: "",
    away: ""
}

async function getScore(score) {
    console.log(score)

    return await axios.get(URL)
        .then(response => {
            let presentScore = response.data[0]
                // console.log(presentScore)
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
    } else if (hasPlayerWon(pastScore.away, presentScoreAway)) {
        console.log("away Player Wins")
    }
    score.home = presentScore.score.home.score
    score.away = presentScore.score.away.score


}

function pollScore() {
    result = setInterval(() => getScore(score), 1000 * 5);
}


pollScore()

module.exports = score