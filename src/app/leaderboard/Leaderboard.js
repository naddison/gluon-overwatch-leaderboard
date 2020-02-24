import React from 'react';
import LeaderboardRow from './LeaderboardRow';

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    sortPlayers(a, b) {
        return (a.averageSR > b.averageSR ? 1 : -1);
    }

    render() {
        const sortedPlayers = this.props.players.sort((a, b) => a.averageSR < b.averageSR ? 1 : -1);

        return (
            <table>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>▲Summary</th>
                        <th>▲Tank</th>
                        <th>▼Damage</th>
                        <th>▼Support</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedPlayers.map(player => {
                            return <LeaderboardRow key={player.name} player={player} />;
                        })
                    }
                </tbody>
            </table>
        );
    }
}

class Leaderboard extends React.Component {
    render() {
        return (
            <Table players={this.props.players} />
        );
    }
}
export default Leaderboard;
