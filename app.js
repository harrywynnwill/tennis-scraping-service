const axios = require('axios');
const colors = require('colors/safe'); // does not alter string prototype
const Score = require('./Score.js') // DB model...
const {transform} = require('./transform');
const {hasPlayerWon} = require('./scoreLogic');

//publish to csharp pricing model
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
    meta: {},
    home: {
        score: '0',
        games: '0',
    },
    away: {
        score: '0',
        games: '0',
    },
}

const Betfair = require('betfair');
const session = new Betfair.BetfairSession('OaCoLTABl5lPkrxa');
session.sessionKey = "xe5hx0KkZGBzGifwypkeOkOqVuP7i7cwGcXWnV3DrYk="; //todo automate logging in to get session token

function getScoresByEvent(eventID) {
    try {
        session.listScores({
            updateKeys: [{eventId: eventID}]
        }, function (err, res) {
            if (err) {
                console.log('listScores failed');
            } else {
                // console.log(res.response.result[0])
                if (res.response && res.response.result) {
                    presentScore = transform(res.response.result[0])
                    publishScoreUpdate(score, presentScore)
                }
            }
        });
    }
    catch (err) {
        console.log(err)
    }
}


function logScore(presentScore, pastScore) {
    console.log(colors.green("present home score"), presentScore.home.score)
    console.log(colors.green("present home game"), presentScore.home.games)
    console.log(colors.blue("present away score"), presentScore.away.score)
    console.log(colors.blue("present away game"), presentScore.away.games)
    console.log(colors.green("past home score"), pastScore.home.score)
    console.log(colors.green("past home game"), pastScore.home.games)
    console.log(colors.blue("past away score"), pastScore.away.score)
    console.log(colors.blue("past away game"), pastScore.away.games)
}

function tradeAndCanel(presentScore) {
    nats.publish('trade', presentScore.home.score)
    setTimeout(() => {
        nats.publish('cancel', presentScore.home.score)
    }, 6000)
}

function publishScoreUpdate(pastScore, presentScore) {
    if (hasPlayerWon(pastScore.home, presentScore.home)) {
        logScore(presentScore, pastScore);
        console.log(colors.red("home Player Wins"))
        nats.publish('home-point', presentScore.home.score)
        // tradeAndCanel(presentScore);
        Score.create({
            pointResult: "home point",
            homePlayer: presentScore.meta.player1,
            awayPlayer: presentScore.meta.player2,
            homePoints: presentScore.home.score,
            awayPoints: presentScore.away.score,
            homeGames: presentScore.home.games,
            awayGames: presentScore.away.games,
            homeSets: presentScore.home.sets,
            awaySets: presentScore.away.sets,
            eventID: Number(eventID),
            jsonObject: presentScore
        }).then(score => {
            // you can now access the newly created Score via the variable Score
        })
    }

    if (hasPlayerWon(pastScore.away, presentScore.away)) {
        logScore(presentScore, pastScore);
        console.log(colors.red("away Player Wins"))
        nats.publish('away-point', presentScore.away.score)
        Score.create({
            pointResult: "away point",
            homePlayer: presentScore.meta.player1,
            awayPlayer: presentScore.meta.player2,
            homePoints: presentScore.home.score,
            awayPoints: presentScore.away.score,
            homeGames: presentScore.home.games,
            awayGames: presentScore.away.games,
            homeSets: presentScore.home.sets,
            awaySets: presentScore.away.sets,
            eventID: Number(eventID),
            jsonObject: presentScore
        }).then(score => {
            // you can now access the newly created task via the variable task
        })
    }
    //Update score object to latest score.
    score.home = presentScore.home
    score.away = presentScore.away
}


function pollScore() {
    console.log(eventID)
    setInterval(() => getScoresByEvent(eventID), 2000)
}


pollScore()


module.exports = score