function hasPlayerWon(pastScore, presentScore){
    if((pastScore.score === "Av" || pastScore.score === "40") && (presentScore.games > pastScore.games)){
        return true
    }
    if(presentScore.score === "40" && pastScore.score === "Av" ){
        return false
    }
    if(presentScore.score === "0" && pastScore.games === presentScore.games){
        return false
    }
    return pastScore.score != presentScore.score && pastScore.games === presentScore.games
  
}

module.exports = {
    hasPlayerWon: hasPlayerWon,
}