import React from 'react';

/**
 * Component that renders a cell specific for the datatype it is meant to display.
 */
class RosterCell extends React.Component {
    render() {
        const column = this.props.column;
        const value = this.props.value;
        const key = (value || Math.random()) + '_' + column;

        switch (column) {
        case 'name':
            return (
                <td key={key}>
                    <p className="playerAvatarTable name">{value}</p>
                </td>
            );
        case 'avatar':
            return (
                <td key={key}>
                    <img className="playerAvatarTable avatar" src={value} />
                </td>
            );
        case 'rank':
            return (
                <td key={key} className="rankTd">
                    <p className="rankValue">{value}</p>
                </td>
            );
        case 'tier':
            return (
                <td key={key} className="rankTd">
                    <img className="playerAvatarTable rankImg" src={value} />
                </td>
            );
        case 'topHeros':
            const jsx = [];

            for (let i = 0; i < value.length; i++) {
                const key2 = (value[i].winRate + i || Math.random()) + '_' + column;

                jsx.push(
                    <table key={key2}>
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
                <td key={key} className="top3HeroCell">
                    {jsx}
                </td>
            );
        case 'timePlayed':
            return (
                <td key={key}>
                    <p>{value}</p>
                </td>
            );
        default:
            return (
                <td key={key}>
                    <p>Unrecognized Data</p>
                </td>
            );
        }
    }
}

export default RosterCell;
