/* eslint-disable quote-props */
import { mapPlayerData, getTopHeros } from '../src/app/DataService';

describe('mapPlayerData()', () => {
    it('should map a single role played correctly', () => {
        const data = require('../src/samples/tillio-1895.json');
        const mappedData = mapPlayerData(data);

        expect(mappedData.ratings.length).toBe(1);
    });
});

describe('getTopHeros()', () => {
    it('should map valid hero data correctly', () => {
        const heroData = require('../src/samples/tillio-1895.json');
        const data = getTopHeros(heroData.competitiveStats.topHeroes);

        expect(data.length).toBe(7);
    });
});
