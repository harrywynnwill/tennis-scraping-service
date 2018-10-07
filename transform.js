function transform(score) {
    console.log("transforming score")
    return {
        home: {
            score: score.values.player1PointsWon,
            games: score.values.player1GamesWon,
            sets: score.values.player1SetsWon,
            setScore: score.values.player1SetScores,
        },
        away: {
            score: score.values.player2PointsWon,
            games: score.values.player2GamesWon,
            sets: score.values.player2SetsWon,
            setScore: score.values.player2SetScores,
        },
        meta: {
            tieBreakType: score.values.tieBreakType,
            eventTypeStatus: score.values.eventTypeStatus,
            bestOfSets: score.values.bestOfSets,
            player1: score.values.player1,
            player2: score.values.player2,
            startDate: score.values.startDate,
        }
    }
}


module.exports = {
    transform: transform,
}