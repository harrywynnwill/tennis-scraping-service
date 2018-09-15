var expect = require('chai').expect;
var {
    hasPlayerWon
} = require('./scoreLogic');

beforeEach(function () {
  console.log('before each')
  console.log(Object.keys(this))
//   debugger
  // this._runnable.parent._onlyTests
})


describe('hasPlayerWon()', () => {
    it('should return true if won false loss', () => {

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
        

        // 2. ACT
        var awayPlayerLoss = hasPlayerWon(score30_40.away, score40_40.away);
        var homePlayerWin = hasPlayerWon(score30_40.home, score40_40.home);
        var homePlayerWinAv = hasPlayerWon(score40_40.home, scoreAv_40.home);
        var homePlayerLossDeuce = hasPlayerWon(scoreAv_40.home, score40_40.home);
        var homePlayerWinsGame = hasPlayerWon(scoreAv_40.home, scorePlayerOneGame0_0.home);
        var awayPlayerLosesGame = hasPlayerWon(scoreAv_40.away, scorePlayerOneGame0_0.away);

        // var expectHomePlayerNoDiff = hasHomePlayerWon(score1, score1);

        // 3. ASSERT
        expect(awayPlayerLoss).to.be.equal(false);
        expect(homePlayerWin).to.be.equal(true);
        expect(homePlayerWinAv).to.be.equal(true);
        expect(homePlayerLossDeuce).to.be.equal(false);
        expect(homePlayerWinsGame).to.be.equal(true);
        expect(awayPlayerLosesGame).to.be.equal(false);
        // expect(expectHomePlayerNoDiff).to.be.equal(false);

    });
});