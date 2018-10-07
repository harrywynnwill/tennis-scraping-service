const expect = require('chai').expect;
const {hasPlayerWon} = require('./scoreLogic');
const {transform} = require('./transform');

beforeEach(function () {
    //   debugger
    // this._runnable.parent._onlyTests
})

// 1. ARRANGE
const score30_40 = {
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
const score40_40 = {
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
const scoreAv_40 = {
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
const score40_Av = {
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
const scorePlayerOneGame0_0 = {
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
const score40_0_5_2_0_0 = {
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
const score0_0_0_0_1_0 = {
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
        const awayPlayerLoss = hasPlayerWon(score30_40.away, score40_40.away);
        // 3. ASSERT
        expect(awayPlayerLoss).to.be.equal(false);
    });

    it('should return true if home player wins', () => {
        // 2. ACT
        const homePlayerWin = hasPlayerWon(score30_40.home, score40_40.home);
        // 3. ASSERT
        expect(homePlayerWin).to.be.equal(true);
    });

    it('should return true if home player wins deuce', () => {
        // 2. ACT
        const homePlayerWinAv = hasPlayerWon(score40_40.home, scoreAv_40.home)
        // 3. ASSERT
        expect(homePlayerWinAv).to.be.equal(true);
    });

    it('should return false if home player loses deuce', () => {
        // 2. ACT
        const homePlayerLossDeuce = hasPlayerWon(scoreAv_40.home, score40_40.home);
        // 3. ASSERT
        expect(homePlayerLossDeuce).to.be.equal(false);
    });

    it('should return true if home player wins game', () => {
        // 2. ACT
        const homePlayerWinsGame = hasPlayerWon(scoreAv_40.home, scorePlayerOneGame0_0.home);
        // 3. ASSERT
        expect(homePlayerWinsGame).to.be.equal(true);
    });

    it('should return false if away player loses game', () => {
        // 2. ACT
        const awayPlayerLosesGame = hasPlayerWon(scoreAv_40.away, scorePlayerOneGame0_0.away);
        // const homePlayerWinsSet = hasPlayerWon(score40_0_5_2_0_0.home, score0_0_0_0_1_0.home);
        // 3. ASSERT
        expect(awayPlayerLosesGame).to.be.equal(false);
        // expect(homePlayerWinsSet).to.be.equal(true);
    });

    it('should return true if home player wins set', () => {
        debugger
        // 2. ACT
        const homePlayerWinsSet = hasPlayerWon(score40_0_5_2_0_0.home, score0_0_0_0_1_0.home);
        // 3. ASSERT
        expect(homePlayerWinsSet).to.be.equal(true);
    });
});

const scoreAPIModel = {
    values: {
        player2PointsWon: '0',
        player1: '2422070',
        player2: '2309522',
        bestOfSets: '3',
        player1SetScores: '3,0',
        player2GamesWon: '0',
        player1GamesWon: '0',
        player1SetsWon: '0',
        player2SetsWon: '1',
        player2SetScores: '6,0',
        isLive: '1',
        player1PointsWon: '30',
        eventTypeStatus: 'inPlay',
        startDate: '2018-10-07T08:14:00.000Z',
        tieBreakType: '0'
    }
}

const scraperModel = {
    home: {
        score: '30',
        games: '0',
        sets: '0',
        setScore: '3,0'
    },
    away: {
        score: '0',
        games: '0',
        sets: '1',
        setScore: '6,0'
    },
    meta: {
        bestOfSets: '3',
        tieBreakType: '0',
        eventTypeStatus: 'inPlay',
        player1: '2422070',
        player2: '2309522',
        startDate: '2018-10-07T08:14:00.000Z',
    }
}

describe('transformToScraperModel()', () => {
    it('it transforms the incoming data to home and away objects', () => {
        // 2. ACT
        const transformedAPIModel = transform(scoreAPIModel);
        // 3. ASSERT
        expect(transformedAPIModel).to.deep.equal(scraperModel);
    });
});