import React from 'react';

class RosterCell extends React.Component {
    render() {
        const column = this.props.column;
        const value = this.props.value;

        switch (column) {
        case 'name':
            return (
                <td>
                    <p className="playerAvatarTable name">{value}</p>
                </td>
            );
        case 'avatar':
            return (
                <td>
                    <img className="playerAvatarTable avatar" src={value} />
                </td>
            );
        case 'rank':
            return (
                <td className="rankTd">
                    <p className="rankValue">{value}</p>
                </td>
            );
        case 'tier':
            return (
                <td className="rankTd">
                    <img className="playerAvatarTable rankImg" src={value} />
                </td>
            );
        case 'top3Heros':
            const jsx = [];

            for (let i = 0; i < value.length; i++) {
                jsx.push(
                    <table>
                        <tbody>
                            <tr>
                                <td><img className="heroImg" src={value[i].iconUrl} /></td>
                            </tr>
                            <tr>
                                <td><p>{value[i].timePlayed / 60} min</p></td>
                            </tr>
                            <tr>
                                <td><p>WR {value[i].winRate}%</p></td>
                            </tr>
                        </tbody>
                    </table>
                );
            }
            return (
                <td className="top3HeroCell">
                    {jsx}
                </td>
            );
        case 'timePlayed':
            return (
                <td>
                    <p>{value}</p>
                </td>
            );
        default:
            return (
                <td>
                    <p>Unrecognized Data</p>
                </td>
            );
        }
    }
}

export default RosterCell;
