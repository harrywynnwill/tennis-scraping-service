const axios = require('axios');
var colors = require('colors/safe'); // does not alter string prototype
const Score = require('./Score.js')

var {
    hasPlayerWon,
} = require('./scoreLogic');

const {
    publish,
    subscribeToEventID,
    // eventID
} = require('./nats.js')
var NATS = require('nats');
var nats = NATS.connect();

let eventID;
nats.subscribe('eventID', function (msg) {
    console.log('Received eventID: ' + msg);
    eventID = msg
})

let score = {
    home: {
        score: '0',
        games: '0',
    },
    away: {
        score: '0',
        games: '0',
    },
}

async function getScore(score) {
    let url = `https://ips.betfair.com/inplayservice/v1/scores?regionCode=UK&_ak=dyMLAanpRyIsjkpJ&alt=json&locale=en_GB&eventIds=${eventID}&ts=1536595908118&xsrftoken=6c1f8131-b41f-11e8-b56c-a0369f0e8798`
    return await axios.get(url)
        .then(response => {
            let presentScore = response.data[0]
            publishScoreUpdate(score, presentScore)
        })
        .catch(error => {
            console.log(error);
        });
}

function publishScoreUpdate(pastScore, presentScore) {

    console.log(colors.green("present home score"), presentScore.score.home.score)
    console.log(colors.green("present home game"), presentScore.score.home.games)
    console.log(colors.blue("present away score"), presentScore.score.away.score)
    console.log(colors.blue("present away game"), presentScore.score.away.games)

    console.log(colors.green("past home score"), pastScore.home.score)
    console.log(colors.green("past home game"), pastScore.home.games)
    console.log(colors.blue("past away score"), pastScore.away.score)
    console.log(colors.blue("past away game"), pastScore.away.games)
    // console.log("pastScore home", pastScore.home)
    // console.log("pastScore away", pastScore.away)

    if (hasPlayerWon(pastScore.home, presentScore.score.home)) {
        console.log(colors.red("home Player Wins"))
        nats.publish('home-point', presentScore.score.home.score)
        Score.create({
            home: presentScore.score.home.score,
            away: presentScore.score.away.score,
        }).then(score => {
            // you can now access the newly created Score via the variable Score
        })
    }
    if (hasPlayerWon(pastScore.away, presentScore.score.away)) {
        console.log(colors.red("away Player Wins"))
        nats.publish('away-point', presentScore.score.away.score)
        Score.create({
            home: presentScore.score.home.score,
            away: presentScore.score.away.score
        }).then(score => {
            // you can now access the newly created task via the variable task
        })
    }
    //Update score object to latest score.
    score.home = presentScore.score.home
    score.away = presentScore.score.away
    // score.home = presentScore.score.home
    // score.away = presentScore.score.away
}

function pollScore() {
    setInterval(() =>
        getScore(score), 1000 * 5);
}



pollScore()


module.exports = score