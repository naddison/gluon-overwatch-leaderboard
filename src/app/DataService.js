import axios from 'axios';

/**
 * Return a sorted list of heros and their data. This function assumes that the heroData is an
 * object in which each of its properties is the hero's name, and the value of that property
 * the hero's data.
 * @param {*} heroData
 */
const getTopHeros = function(heroData) {
    const mappedHeroes = [];

    for (const key in heroData) {
        if (heroData.hasOwnProperty(key) && typeof heroData[key] !== 'function' && key !== 'allHeroes') {
            try {
                let heroName = key === 'soldier76' ? 'soldier-76' : key;

                heroName = heroName.toLowerCase();
                mappedHeroes.push({
                    name: key,
                    timePlayed: heroData[key].game.timePlayed,
                    winRate: heroData[key].game.winPercentage,
                    iconUrl: `https://d1u1mce87gyfbn.cloudfront.net/hero/${heroName}/icon-portrait.png`
                });
            } catch (err) {
                //
            }
        }
    }

    mappedHeroes.sort((a, b) => {
        return hmsToSecondsOnly(b.timePlayed) - hmsToSecondsOnly(a.timePlayed);
    });

    return mappedHeroes.slice(0, 5);
};

/**
 * Function to convert DD:HH:MM to seconds in an integer.
 *
 * Totally lifted this from StackOverflow, see the link:
 * https://stackoverflow.com/questions/9640266/convert-hhmmss-string-to-seconds-only-in-javascript/9640417
 */
const hmsToSecondsOnly = (str) => {
    const p = str.split(':');
    let s = 0;
    let m = 1;

    while (p.length > 0) {
        s = s + m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
};

/**
 * Class that acts as the layer between the API and the rest of the FE. Calls
 * to the API are wrapped in methods defined in this class.
 *
 * The express.js server serving the app will proxy each request to the API to avoid
 * CORS issues.
 *
 * Note: Ideally I would have a clever use of redux as my data layer...maybe later.
 */
class DataService {
    fetchPlayerData(battleTag) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/stats/pc/us/${battleTag}`)
                .then(response => {
                    // map the response from the api to a structure we want
                    const temp = {
                        name: response.data.name,
                        avatar: response.data.icon,
                        rank: response.data.rating,
                        tier: response.data.ratingIcon,
                        topHeros: getTopHeros(response.data.competitiveStats.careerStats),
                        timePlayed: response.data.competitiveStats.careerStats.allHeroes.game.timePlayed
                    };

                    resolve(temp);
                }).catch(err => {
                    reject(err);
                });
        });
    }
}

const dataService = new DataService();

module.exports = dataService;
