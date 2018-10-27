import React from 'react';
import dataService from './DataService';
import Roster from './RosterTable'
import './main.css';

var columns = [
    'battleTag',
    'rank',
    'top3Heros',
    'timePlayed'
]

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            rows : {}
        }
    }

    componentDidMount() {
        dataService.fetchPlayerData()
            .then(playerData => {
                this.setState({
                    rows : playerData
                });
            });
    }

    render() {
        return (
            <div>
                <Header/>
                <Statement/>
                <Roster columns={columns} rows={this.state.rows}/>
            </div>
        )
    }
}

class Spinner extends React.Component {
    render() {
        return (
            <div claclassNamess="spinner" style="display: none;">
                <div class="cube1"></div>
                <div class="cube2"></div>
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <h1>Overwatch Friend List</h1>
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