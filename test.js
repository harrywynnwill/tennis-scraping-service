var expect = require('chai').expect;
var {
    hasPlayerWon
} = require('./scoreLogic');

beforeEach(function () {
    //   debugger
    // this._runnable.parent._onlyTests
})

// 1. ARRANGE
var score30_40 = {
    home: {
        name: 'Dalila Jakupovic',
        score: '30',
        halfTimeScore: '',
        fullTimeScore: '',
        penaltiesScore: '',
        penaltiesSequence: [],
        games: '4',
        sets: '0',
        aces: '1',
        doubleFaults: '2',
        gameSequence: [],
        isServing: false,
        highlight: false,
        playerSeed: 1,
        serviceBreaks: 2
    },
    away: {
        name: 'Victoria Duval',
        score: '40',
        halfTimeScore: '',
        fullTimeScore: '',
        penaltiesScore: '',
        penaltiesSequence: [],
        games: '2',
        sets: '0',
        aces: '0',
        doubleFaults: '0',
        gameSequence: [],
        isServing: true,
        highlight: true,
        playerSeed: 7,
        serviceBreaks: 1
    }
}
var score40_40 = {
    home: {
        name: 'Dalila Jakupovic',
        score: '40',
        halfTimeScore: '',
        fullTimeScore: '',
        penaltiesScore: '',
        penaltiesSequence: [],
        games: '4',
        sets: '0',
        aces: '1',
        doubleFaults: '2',
        gameSequence: [],
        isServing: false,
        highlight: false,
        playerSeed: 1,
        serviceBreaks: 2
    },
    away: {
        name: 'Victoria Duval',
        score: '40',
        halfTimeScore: '',
        fullTimeScore: '',
        penaltiesScore: '',
        penaltiesSequence: [],
        games: '2',
        sets: '0',
        aces: '0',
        doubleFaults: '0',
        gameSequence: [],
        isServing: true,
        highlight: true,
        playerSeed: 7,
        serviceBreaks: 1
    }
}
var scoreAv_40 = {
    home: {
        name: 'Dalila Jakupovic',
        score: 'Av',
        halfTimeScore: '',
        fullTimeScore: '',
        penaltiesScore: '',
        penaltiesSequence: [],
        games: '4',
        sets: '0',
        aces: '1',
        doubleFaults: '2',
        gameSequence: [],
        isServing: false,
        highlight: false,
        playerSeed: 1,
        serviceBreaks: 2
    },
    away: {
        name: 'Victoria Duval',
        score: '40',
        halfTimeScore: '',
        fullTimeScore: '',
        penaltiesScore: '',
        penaltiesSequence: [],
        games: '2',
        sets: '0',
        aces: '0',
        doubleFaults: '0',
        gameSequence: [],
        isServing: true,
        highlight: true,
        playerSeed: 7,
        serviceBreaks: 1
    }
}
var score40_Av = {
    home: {
        name: 'Dalila Jakupovic',
        score: '40',
        halfTimeScore: '',
        fullTimeScore: '',
        penaltiesScore: '',
        penaltiesSequence: [],
        games: '4',
        sets: '0',
        aces: '1',
        doubleFaults: '2',
        gameSequence: [],
        isServing: false,
        highlight: false,
        playerSeed: 1,
        serviceBreaks: 2
    },
    away: {
        name: 'Victoria Duval',
        score: 'Av',
        halfTimeScore: '',
        fullTimeScore: '',
        penaltiesScore: '',
        penaltiesSequence: [],
        games: '2',
        sets: '0',
        aces: '0',
        doubleFaults: '0',
        gameSequence: [],
        isServing: true,
        highlight: true,
        playerSeed: 7,
        serviceBreaks: 1
    }
}
var scorePlayerOneGame0_0 = {
    home: {
        name: 'Dalila Jakupovic',
        score: '0',
        halfTimeScore: '',
        fullTimeScore: '',
        penaltiesScore: '',
        penaltiesSequence: [],
        games: '5',
        sets: '0',
        aces: '1',
        doubleFaults: '2',
        gameSequence: [],
        isServing: false,
        highlight: false,
        playerSeed: 1,
        serviceBreaks: 2
    },
    away: {
        name: 'Victoria Duval',
        score: '0',
        halfTimeScore: '',
        fullTimeScore: '',
        penaltiesScore: '',
        penaltiesSequence: [],
        games: '2',
        sets: '0',
        aces: '0',
        doubleFaults: '0',
        gameSequence: [],
        isServing: true,
        highlight: true,
        playerSeed: 7,
        serviceBreaks: 1
    }
}
var score40_0_5_2_0_0 = {
    home: {
        name: 'Dalila Jakupovic',
        score: '40',
        halfTimeScore: '',
        fullTimeScore: '',
        penaltiesScore: '',
        penaltiesSequence: [],
        games: '5',
        sets: '0',
        aces: '1',
        doubleFaults: '2',
        gameSequence: [],
        isServing: false,
        highlight: false,
        playerSeed: 1,
        serviceBreaks: 2
    },
    away: {
        name: 'Victoria Duval',
        score: '0',
        halfTimeScore: '',
        fullTimeScore: '',
        penaltiesScore: '',
        penaltiesSequence: [],
        games: '2',
        sets: '0',
        aces: '0',
        doubleFaults: '0',
        gameSequence: [],
        isServing: true,
        highlight: true,
        playerSeed: 7,
        serviceBreaks: 1
    }
}
var score0_0_0_0_1_0 = {
    home: {
        name: 'Dalila Jakupovic',
        score: '0',
        halfTimeScore: '',
        fullTimeScore: '',
        penaltiesScore: '',
        penaltiesSequence: [],
        games: '0',
        sets: '1',
        aces: '1',
        doubleFaults: '2',
        gameSequence: [],
        isServing: false,
        highlight: false,
        playerSeed: 1,
        serviceBreaks: 2
    },
    away: {
        name: 'Victoria Duval',
        score: '0',
        halfTimeScore: '',
        fullTimeScore: '',
        penaltiesScore: '',
        penaltiesSequence: [],
        games: '0',
        sets: '0',
        aces: '0',
        doubleFaults: '0',
        gameSequence: [],
        isServing: true,
        highlight: true,
        playerSeed: 7,
        serviceBreaks: 1
    }
}

describe('hasPlayerWon()', () => {
    it('should return false if away player loses', () => {
        // 2. ACT
        var awayPlayerLoss = hasPlayerWon(score30_40.away, score40_40.away);
        // 3. ASSERT
        expect(awayPlayerLoss).to.be.equal(false);
    });

    it('should return true if home player wins', () => {
        // 2. ACT
        var homePlayerWin = hasPlayerWon(score30_40.home, score40_40.home);
        // 3. ASSERT
        expect(homePlayerWin).to.be.equal(true);
    });

    it('should return true if home player wins deuce', () => {
        // 2. ACT
        var homePlayerWinAv = hasPlayerWon(score40_40.home, scoreAv_40.home)
        // 3. ASSERT
        expect(homePlayerWinAv).to.be.equal(true);
    });

    it('should return false if home player loses deuce', () => {
        // 2. ACT
        var homePlayerLossDeuce = hasPlayerWon(scoreAv_40.home, score40_40.home);
        // 3. ASSERT
        expect(homePlayerLossDeuce).to.be.equal(false);
    });

    it('should return true if home player wins game', () => {
        // 2. ACT
        var homePlayerWinsGame = hasPlayerWon(scoreAv_40.home, scorePlayerOneGame0_0.home);
        // 3. ASSERT
        expect(homePlayerWinsGame).to.be.equal(true);
    });

    it('should return false if away player loses game', () => {
        // 2. ACT
        var awayPlayerLosesGame = hasPlayerWon(scoreAv_40.away, scorePlayerOneGame0_0.away);
        // var homePlayerWinsSet = hasPlayerWon(score40_0_5_2_0_0.home, score0_0_0_0_1_0.home);
        // 3. ASSERT
        expect(awayPlayerLosesGame).to.be.equal(false);
        // expect(homePlayerWinsSet).to.be.equal(true);
    });

    it('should return true if home player wins set', () => {
        debugger
        // 2. ACT
        var homePlayerWinsSet = hasPlayerWon(score40_0_5_2_0_0.home, score0_0_0_0_1_0.home);
        // 3. ASSERT
        expect(homePlayerWinsSet).to.be.equal(true);
    });
});