import React from 'react';
import styled from 'styled-components';

const TextDiv = styled.div`
    font-family: 'Blizzard';
    fontSize: 1em;
    text-align: center;
`;

const P = styled.p`
    margin: 7px
`;

class Identity extends React.Component {
    render() {
        return (
            <TextDiv>
                <P>{this.props.name || "N/A"}</P>
                <P>Endorsement {this.props.endorsementLevel || "N/A"}</P>
                <P>Level {this.props.level || "N/A"}</P>
                <P>Average: {this.props.averageSR || "N/A"}</P>
            </TextDiv>
        );
    }
}

export default Identity;
