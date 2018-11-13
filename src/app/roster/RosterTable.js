import React from 'react';
import RosterRow from './RosterRow';

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    tableHeaders(columns) {
        const columnToHeaderMapping = {
            name: 'name',
            avatar: 'avatar',
            rank: 'rating',
            tier: 'tier',
            top3Heros: 'top heroes',
            timePlayed: 'time played'
        };

        let i = 0;

        return (
            <tr>
                {columns.map(function(column) {
                    i++;
                    return <th key={column + i}>{columnToHeaderMapping[column]}</th>;
                })}
            </tr>
        );
    }

    tableBody(columns, rows) {
        let i = 0;

        if (rows && rows.length > 0) {
            return rows.map(function(row) {
                i++;
                return (<RosterRow key={row.name + i} columns={columns} row={row} />);
            });
        }

        return (<tr />);
    }

    render() {
        const columns = this.props.columns;
        const rows = this.props.rows ? this.props.rows : [];

        if (rows.length > 0) {
            rows.sort((a, b) => {
                return b.rank - a.rank;
            });
        }

        return (

            <table className="core">
                <thead>
                    {this.tableHeaders(columns)}
                </thead>
                <tbody>
                    {this.tableBody(columns, rows)}
                </tbody>
            </table>
        );
    }
}

class Roster extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table columns={this.props.columns} rows={this.props.rows} />
        );
    }
}

export default Roster;
