import React from 'react';
import styled from 'styled-components';

const AvatarImg = styled.img`
    display: block;
    margin: 0 auto;
    height: auto;
    width: 6em;
    -webkit-box-shadow: 0px 0px 8px 2px rgba(0,0,0,0.74);
    box-shadow: 0px 0px 8px 2px rgba(0,0,0,0.74);
`;

class Icon extends React.Component {
    render() {
        return (
            <div>
                <AvatarImg
                    id="icon"
                    src={this.props.iconUrl}
                />
            </div>
        );
    }
}

export default Icon;
