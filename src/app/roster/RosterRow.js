import React from 'react';
import RosterCell from './RosterCell';

/**
 * Class representing a row of the roster table.
 */
class RosterRow extends React.Component {
    rowJsx(columns, row) {
        let i = 0;

        return columns.map(function(column) {
            i++;
            // return (
            //     <RosterCell key={row[column] + i} column={column} value={row[column]} />
            // );

            return (
                <tr></tr>
            )
        });
    }

    render() {
        const columns = this.props.columns;
        const row = this.props.row;

        return (
            <tr key={columns + row}>
                {this.rowJsx(columns, row)}
            </tr>
        );
    }
}

export default RosterRow;
