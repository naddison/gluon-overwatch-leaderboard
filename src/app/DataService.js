import axios from 'axios'

const battleTags = ['Tillio-1895', 'Dad76-1987', 'RobotKrieger-1651']

class DataService {

    async fetchPlayerData() {
        console.log(`Fetching roster data for battletags ${battleTags}`);
        let data = []
        for (let battleTag of battleTags) {
            await axios.get(`/api/stats/pc/us/${battleTag}`)
                .then(response => {
                    //map the response from the api to a structure we want
                    let temp = {
                        battleTag: {
                            tag: response.data.name,
                            avatar: response.data.icon,
                        },
                        rank: {
                            imgUrl: response.data.ratingIcon,
                            value: response.data.rating,
                        },
                        top3Heros: [
                            "https://d1u1mce87gyfbn.cloudfront.net/hero/zarya/icon-portrait.png",
                            "https://d1u1mce87gyfbn.cloudfront.net/hero/bastion/icon-portrait.png",
                            "https://d1u1mce87gyfbn.cloudfront.net/hero/ana/icon-portrait.png"
                        ],
                        timePlayed: 51
                    }
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