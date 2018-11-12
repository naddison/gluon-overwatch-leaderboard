import axios from 'axios';

const battleTags = process.env.BATTLE_TAGS.split(',') || ['Tillio-1895'];

const getTop3 = function(heroData) {
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
 * https://stackoverflow.com/questions/9640266/convert-hhmmss-string-to-seconds-only-in-javascript/9640417
 * @param {*} str
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

class DataService {
    async fetchPlayerData() {
        console.info(`Fetching roster data for battletags ${battleTags}`);
        const data = [];

        for (const battleTag of battleTags) {
            await axios.get(`/api/stats/pc/us/${battleTag}`)
                .then(response => {
                    // map the response from the api to a structure we want
                    const temp = {
                        name: response.data.name,
                        avatar: response.data.icon,
                        rank: response.data.rating,
                        tier: response.data.ratingIcon,
                        top3Heros: getTop3(response.data.competitiveStats.careerStats),
                        timePlayed: response.data.competitiveStats.careerStats.allHeroes.game.timePlayed
                    };

                    data.push(temp);
                })
                .catch(error => {
                    console.info('Error Will Robinson!');
                    console.error(error);
                });
        }

        return data;
    }
}

const dataService = new DataService();

module.exports = dataService;
