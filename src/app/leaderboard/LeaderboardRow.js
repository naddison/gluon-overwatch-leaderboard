import React from 'react';
import Identity from './LeaderboardIdentity';
import LeaderboardAvatar from './LeaderboardAvatar';
import LeadboardRanks from './LeaderboardRanks';
import styled from 'styled-components';

const avatarStyle = {
    width: '10%'
};

const identityStyle = {
    width: '10%'
};

const rankStyle = {
    width: '10%'
};

class LeaderboardRow extends React.Component {
    render() {
        return (
            <tr>
                <td style={avatarStyle} id="avatar">
                    <LeaderboardAvatar iconUrl={this.props.player ? this.props.player.avatar : null} />
                </td>
                <td style={identityStyle} id="identity">
                    <Identity
                        name={this.props.player ? this.props.player.name : null}
                        endorsementLevel={this.props.player ? this.props.player.endorsementLevel : null}
                        averageSR={this.props.player ? this.props.player.averageSR : null}
                        level={this.props.player ? this.props.player.level : null}
                    />
                </td>
                <td id="rank_tank" style={rankStyle}>
                    <LeadboardRanks
                        rank={this.props.player.ratings ? this.props.player.ratings[0].rank : null}
                        topHeros={this.props.player.topHeroes ? this.props.player.topHeroes.slice(0, 3) : null}
                    />
                </td>
                <td id="rank_damage" style={rankStyle}>
                    <LeadboardRanks
                        rank={this.props.player.ratings ? this.props.player.ratings[1].rank : null}
                        topHeros={this.props.player.topHeroes ? this.props.player.topHeroes.slice(0, 3) : null}
                    />
                </td>
                <td id="rank_support" style={rankStyle}>
                    <LeadboardRanks
                        rank={this.props.player.ratings ? this.props.player.ratings[2].rank : null}
                        topHeros={this.props.player.topHeroes ? this.props.player.topHeroes.slice(0, 3) : null}
                    />
                </td>
            </tr>
        );
    }
}

export default LeaderboardRow;
