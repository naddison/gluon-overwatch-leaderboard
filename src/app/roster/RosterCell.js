import React from 'react';

/**
 * Component that renders a cell specific for the datatype it is meant to display.
 */
class RosterCell extends React.Component {
    render() {
        const column = this.props.column;
        const value = this.props.value;

        switch (column) {
        case 'name':
            return (
                <td key={value}>
                    <p className="playerAvatarTable name">{value}</p>
                </td>
            );
        case 'avatar':
            return (
                <td key={value}>
                    <img className="playerAvatarTable avatar" src={value} />
                </td>
            );
        case 'rank':
            return (
                <td key={value} className="rankTd">
                    <p className="rankValue">{value}</p>
                </td>
            );
        case 'tier':
            return (
                <td key={value} className="rankTd">
                    <img className="playerAvatarTable rankImg" src={value} />
                </td>
            );
        case 'topHeros':
            const jsx = [];

            for (let i = 0; i < value.length; i++) {
                jsx.push(
                    <table key={value[i].winRate + i}>
                        <tbody>
                            <tr>
                                <td><img className="heroImg" src={value[i].iconUrl} /></td>
                            </tr>
                            <tr>
                                <td><p>{value[i].timePlayed}</p></td>
                            </tr>
                            <tr>
                                <td><p>{value[i].winRate}%</p></td>
                            </tr>
                        </tbody>
                    </table>
                );
            }
            return (
                <td key={value} className="top3HeroCell">
                    {jsx}
                </td>
            );
        case 'timePlayed':
            return (
                <td key={value}>
                    <p>{value}</p>
                </td>
            );
        default:
            return (
                <td key={value}>
                    <p>Unrecognized Data</p>
                </td>
            );
        }
    }
}

export default RosterCell;
