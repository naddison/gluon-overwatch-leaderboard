import React from 'react';
import LoadingScreen from './loadingScreen';
import dataService from './DataService';
import Roster from 'app/roster/RosterTable';
import './main.css';

const columns = [
    'name',
    'avatar',
    'rank',
    'tier',
    'top3Heros',
    'timePlayed'
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };
    }

    componentDidMount() {
        dataService.fetchPlayerData()
            .then(playerData => {
                this.setState({
                    rows: playerData
                });
            });
    }

    render() {
        if (this.state.rows.length === 0) {
            return (
                <LoadingScreen
                    loading={true}
                    bgColor="#f1f1f1"
                    spinnerColor="#9ee5f8"
                    textColor="#676767"
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

class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <h1>Gluon Overwatch Leaderboard</h1>
            </div>
        );
    }
}

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
