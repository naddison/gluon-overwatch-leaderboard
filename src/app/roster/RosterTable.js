import React from 'react';
import RosterCell from './RosterCell';

class TableRow extends React.Component {
    rowJsx(columns, row) {
        return columns.map(function(column) {
            return (
                <RosterCell key={row[column]} column={column} value={row[column]} />
            );
        });
    }

    render() {
        const columns = this.props.columns;
        const row = this.props.row;

        return (
            <tr>
                {this.rowJsx(columns, row)}
            </tr>
        );
    }
}

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

        return (
            <tr>
                {columns.map(function(column) {
                    return <th key={column}>{columnToHeaderMapping[column]}</th>;
                })}
            </tr>
        );
    }

    tableBody(columns, rows) {
        if (rows && rows.length > 0) {
            return rows.map(function(row) {
                return (<TableRow key={row.battleTag} columns={columns} row={row} />);
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
