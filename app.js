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

let eventID = '28942420'

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
session.sessionKey = "Uf0iffWyDJ8+Kz2hJeyo33CMtFzKuUUC5JPRBuv9EyA="; //todo automate logging in to get session token

function getScoresByEvent(eventID) {
    session.listScores({
        updateKeys: [{eventId: eventID}]
    }, function (err, res) {
        if (err) {
            console.log('listScores failed');
        } else {
            console.log(res.response.result[0])
            presentScore = transform(res.response.result[0])
            publishScoreUpdate(score, presentScore)
        }
    });
}


// async function getScore(score) {
//     console.log(Number(eventID))
//     if (eventID) {
//         let url = `https://ips.betfair.com/inplayservice/v1/scores?regionCode=UK&_ak=dyMLAanpRyIsjkpJ&alt=json&locale=en_GB&eventIds=${eventID}&ts=1536595908118&xsrftoken=6c1f8131-b41f-11e8-b56c-a0369f0e8798`
//         return await axios.get(url)
//             .then(response => {
//                 let presentScore = response.data[0]
//                 publishScoreUpdate(score, presentScore)
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }
// }


function publishScoreUpdate(pastScore, presentScore) {

    console.log(colors.green("present home score"), presentScore.home.score)
    console.log(colors.green("present home game"), presentScore.home.games)
    console.log(colors.blue("present away score"), presentScore.away.score)
    console.log(colors.blue("present away game"), presentScore.away.games)

    console.log(colors.green("past home score"), pastScore.home.score)
    console.log(colors.green("past home game"), pastScore.home.games)
    console.log(colors.blue("past away score"), pastScore.away.score)
    console.log(colors.blue("past away game"), pastScore.away.games)
    // console.log("pastScore home", pastScore.home)
    // console.log("pastScore away", pastScore.away)

    if (hasPlayerWon(pastScore.home, presentScore.home)) {
        console.log(colors.red("home Player Wins"))
        nats.publish('home-point', presentScore.home.score)
        Score.create({
            homePlayer: presentScore.meta.player1,
            awayPlayer: presentScore.meta.player2,
            homePoints: presentScore.home.score,
            awayPoints: presentScore.away.score,
            homeGames: presentScore.home.games,
            awayGames: presentScore.away.games,
            homeSets: presentScore.home.sets,
            awaySets:presentScore.away.sets,
            eventID: Number(eventID),
            jsonObject: presentScore.score
        }).then(score => {
            // you can now access the newly created Score via the variable Score
        })
    }
    if (hasPlayerWon(pastScore.away, presentScore.away)) {
        console.log(colors.red("away Player Wins"))
        nats.publish('away-point', presentScore.away.score)
        Score.create({
            homePlayer: presentScore.meta.player1,
            awayPlayer: presentScore.meta.player2,
            homePoints: presentScore.home.score,
            awayPoints: presentScore.away.score,
            homeGames: presentScore.home.games,
            awayGames: presentScore.away.games,
            homeSets: presentScore.home.sets,
            awaySets:presentScore.away.sets,
            eventID: Number(eventID),
            jsonObject: presentScore.score
        }).then(score => {
            // you can now access the newly created task via the variable task
        })
    }
    //Update score object to latest score.
    score.home = presentScore.home
    score.away = presentScore.away
    // score.home = presentScore.home
    // score.away = presentScore.away
}

// function pollScore() {
//     setInterval(() =>
//         getScore(score), 1000 * 5);
// }


function pollScore(eventId) {
    setInterval(() =>
        getScoresByEvent(eventId), 2000);
}


pollScore(eventID)


module.exports = score