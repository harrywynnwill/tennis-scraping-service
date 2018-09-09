function scoreIncrement(pastScore, presentScore){
    if (pastScore.away != presentScore.away) {
        pastSCore.away = presentScore.away
    }
    return presentScore
}
function hasPlayerWon(pastScore, presentScore){
   return pastScore != presentScore
}



module.exports = {
    hasPlayerWon: hasPlayerWon,
}