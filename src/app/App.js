import React from 'react';
import LoadingScreen from './loading-screen';
import dataService from './DataService';
import Roster from 'app/roster/RosterTable';
import './main.css';

/**
 * Battletags of players to fetch stats for.
 */
const battleTags = process.env.BATTLE_TAGS.split(',') || ['Tillio-1895', 'RobotKrieger-1651'];

/**
 * Expected properties of the player object coming out of DataService.
 */
const columns = [
    'name',
    'avatar',
    'rank',
    'tier',
    'topHeros',
    'timePlayed'
];

/**
 * Parent component of the entire app added to the root element of index.html.
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };
    }

    componentDidMount() {
        for (let i = 0; i < battleTags.length; i++) {
            console.info('Fetching data for ' + battleTags[i]);
            dataService.fetchPlayerData(battleTags[i])
                .then(result => {
                    this.setState({
                        rows: [...this.state.rows, result]
                    });
                }).catch(err =>{
                    console.info('Danger will robinson! .. ' + JSON.stringify(err));
                    this.setState({
                        err
                    });
                });
        }
    }

    render() {
        if (this.state.rows.length < 2 || this.state.err) {
            let message = '';

            if (this.state.err) {
                message = this.state.err.response ? this.state.err.response.statusText
                    + ' ...tell Nik something borked...' : '...tell Nik something borked...';
            } else {
                message = 'Loading...';
            }

            return (
                <LoadingScreen
                    loading={true}
                    spinnerColor="#9ee5f8"
                    text={message}
                    bgImg='url("/static/loadingScreen.jpg")'
                />
            );
        }

        return (
            <div>
                <Header />
                <Statement />
                <Roster columns={columns} rows={this.state.rows} />
            </div>
        );
    }
}

/**
 * Component representing a header for the page.
 */
class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <h1>Gluon Overwatch Leaderboard</h1>
            </div>
        );
    }
}

/**
 * Component representing a section for a news, or FYI statement.
 */
class Statement extends React.Component {
    render() {
        return (
            <div className="notes">
                <h1>Profiles are set to private by default. You can modify this setting in Overwatch under Options – Social.</h1>
            </div>
        );
    }
}

export default App;
