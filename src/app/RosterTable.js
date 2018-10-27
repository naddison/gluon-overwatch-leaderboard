import React from 'react';

class TableCell extends React.Component {

    render() {

        var column = this.props.column;
        var value = this.props.value;

        switch(column) {
            case "battleTag":
                return (
                    <td>
                        {/*<img className="playerAvatarTable avatar" src={value["avatar"]}/>*/}
                        <p>{value["tag"]}</p>
                    </td>
                )
            case "rank":
                return (
                    <td>
                        {/*<img className="playerAvatarTable rankImg" src={value["imgUrl"]}/>*/}
                        <p className="rankValue">{value["value"]}</p>
                    </td>
                )
            case "top3Heros":
                return (
                    <td className="top3HeroCell">
                        <div id="top3HeroContainer">
                            <div><img className="heroImg" src={value[0]}/></div>
                            <div><img className="heroImg" src={value[1]}/></div>
                            <div><img className="heroImg" src={value[2]}/></div>
                        </div>
                    </td>
                )
            case "timePlayed":
                return (
                    <td>
                        <p>{value} minutes</p>
                    </td>
                )
            default:
                return (
                    <td>
                        <p>Unrecognized Data</p>
                    </td>
                )
        }
    }
}

class TableRow extends React.Component {

    rowJsx(columns, row) {
        return columns.map(function(column) {
            return (
                <TableCell key={row[column]} column={column} value={row[column]}></TableCell>
            )
        })
    }

    render() {
        var columns = this.props.columns;
        var row = this.props.row;
        
        return (
            <tr>
                {this.rowJsx(columns, row)}
            </tr>
        )
    }
}

class Table extends React.Component {

    constructor(props) {
        super(props);
    }

    tableHeaders(columns) { 
        var index = 0;
        return (
            <tr> 
                {columns.map(function(column) {
                    return <th key={column}>{column}</th>; })}
            </tr>
        )
    };

    tableBody(columns, rows) { 
        if (rows && rows.length > 0) {
            return rows.map(function(row) {
                return (<TableRow key={row["battleTag"]} columns={columns} row={row}></TableRow>)
            })
        }
    };

    render() {

        var columns = this.props.columns;
        var rows = this.props.rows ? this.props.rows : [];

        return (

            <table className="core">
                <thead>
                    {this.tableHeaders(columns)}
                </thead>
                <tbody>
                    {this.tableBody(columns, rows)}
                </tbody>
            </table>
        )
    }
}

class Roster extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table columns={this.props.columns} rows={this.props.rows}></Table>
        );
    }
}

export default Roster;