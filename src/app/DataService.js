import axios from 'axios'

const battleTags = ['Tillio-1895', 'RobotKrieger-1651', 'Sidewinder-1918', 'CutleryHero-1901']

function getTop3(heroData) {
    let mappedHeroes = [];

    for (let key in heroData) {
        try {
            if (heroData.hasOwnProperty(key) && typeof heroData[key] !== 'function') {
            let heroName = key == 'soldier76' ? 'soldier-76' : key;
            heroName = heroName.toLowerCase();
            mappedHeroes.push({
                name: key,
                timePlayed: heroData[key].timePlayedInSeconds,
                winRate: heroData[key].winPercentage,
                iconUrl: `https://d1u1mce87gyfbn.cloudfront.net/hero/${heroName}/icon-portrait.png`
            });
        }}
        catch (err) {

        }
    }

    mappedHeroes.sort((a, b) => {
        return b.timePlayed - a.timePlayed; 
    });

    console.log(JSON.stringify(mappedHeroes));

    return mappedHeroes.slice(0, 5);
}

class DataService {

    async fetchPlayerData() {
        console.log(`Fetching roster data for battletags ${battleTags}`);
        let data = []
        for (let battleTag of battleTags) {
            await axios.get(`/api/stats/pc/us/${battleTag}`)
                .then(response => {
                    //map the response from the api to a structure we want
                    let temp = {
                        name: response.data.name,
                        avatar: response.data.icon,
                        rank: response.data.rating,
                        tier: response.data.ratingIcon,
                        top3Heros: getTop3(response.data.competitiveStats.topHeroes),
                        timePlayed: response.data.competitiveStats.careerStats.allHeroes.game.timePlayed
                    }
                    console.log('-------BattleTAG'+ battleTag);
                    data.push(temp);
                })
                .catch(error => {
                    console.log("Error Will Robinson!")
                    console.error(error);
                })
        }

        return data;
    }
}



var dataService = new DataService();
module.exports = dataService;