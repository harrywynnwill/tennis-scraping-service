function hasPlayerWon(pastScore, presentScore) {
    //useful for debugging tests
    // console.log("past score points:", pastScore.score)
    // console.log("past score games:", pastScore.games)
    // console.log("past score sets:", pastScore.sets)
    // console.log("present score points:", presentScore.score)
    // console.log("present score games:", presentScore.games)
    // console.log("present score sets:", presentScore.sets)
    if ((pastScore.score === "Av" || pastScore.score === "40") && (presentScore.games > pastScore.games)) {
        return true
    }
    if (presentScore.score === "40" && pastScore.score === "Av") {
        return false
    }
    if (presentScore.score === "0" && pastScore.games === presentScore.games) {
        return false
    }
    return pastScore.score != presentScore.score && pastScore.games === presentScore.games || presentScore.sets > pastScore.sets
 
}

module.exports = {
    hasPlayerWon: hasPlayerWon,
}