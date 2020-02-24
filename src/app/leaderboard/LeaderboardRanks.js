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

const ImgDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const HeroImg = styled.img`
    height: auto;
    width: 50px;
    float: left;
`;

class Rank extends React.Component {
    render() {
        return (
            <TextDiv>
                <P>{this.props.rank || 'N/A' }</P>
                <ImgDiv>
                    {
                        this.props.topHeros
                            ? this.props.topHeros.map(hero => <HeroImg key={this.props.rank + hero.iconUrl} src={hero.iconUrl} />)
                            : <P>NO DATA</P>
                    }
                </ImgDiv>
            </TextDiv>
        );
    }
}

export default Rank;
