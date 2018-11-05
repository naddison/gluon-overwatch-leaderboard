import axios from 'axios';

const battleTags = process.env.BATTLE_TAGS.split(',') || ['Tillio-1895'];

const getTop3 = function(heroData) {
    const mappedHeroes = [];

    for (const key in heroData) {
        if (heroData.hasOwnProperty(key) && typeof heroData[key] !== 'function') {
            try {
                let heroName = key === 'soldier76' ? 'soldier-76' : key;

                heroName = heroName.toLowerCase();
                mappedHeroes.push({
                    name: key,
                    timePlayed: heroData[key].timePlayedInSeconds,
                    winRate: heroData[key].winPercentage,
                    iconUrl: `https://d1u1mce87gyfbn.cloudfront.net/hero/${heroName}/icon-portrait.png`
                });
            } catch (err) {
                //
            }
        }
    }

    mappedHeroes.sort((a, b) => {
        return b.timePlayed - a.timePlayed;
    });

    return mappedHeroes.slice(0, 5);
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
                        top3Heros: getTop3(response.data.competitiveStats.topHeroes),
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
