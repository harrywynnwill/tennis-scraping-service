var expect = require('chai').expect;
var {hasHomePlayerWon} = require('./scoreLogic');

describe('scoreIncrement()', function () {
    it('should increment the scores', function () {

        // 1. ARRANGE
        var score1 = {
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
        var score2 = { home:
            { name: 'Dalila Jakupovic',
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
              serviceBreaks: 2 },
           away:
            { name: 'Victoria Duval',
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
              serviceBreaks: 1 } }

        // 2. ACT
        var expectHomePlayer = hasHomePlayerWon(score1, score2);
        var expectHomePlayerNoDiff = hasHomePlayerWon(score1, score1);

        // 3. ASSERT
        expect(expectHomePlayer).to.be.equal(true);
        expect(expectHomePlayerNoDiff).to.be.equal(false);

    });
});
