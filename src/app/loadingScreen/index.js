import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import styled from 'styled-components';

import Logo from './components/Logo';
import Text from './components/Text';

const ScreenWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background: ${props => props.bgColor || '#ffffff'};
  opacity: ${props => props.loading ? 1 : 0};
  visibility: ${props => props.loading ? 'visible' : 'hidden'};
  transition: opacity 0.4s, visibility -0.3s linear 0.5s;
  background-image: ${props => props.bgImg};
  background-size: 100% auto;
`;
const LoadingComponents = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LoadableData = styled.div`
  display: ${props => props.loading ? 'none' : 'block'};
`;

const propTypes = {
    children: PropTypes.node.isRequired,
    bgImg: PropTypes.string,
    bgColor: PropTypes.string,
    spinnerColor: PropTypes.string,
    textColor: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    logoSrc: PropTypes.string,
    text: PropTypes.string
};

const LoadingScreen = function({
    children,
    bgColor,
    bgImg,
    spinnerColor,
    textColor,
    loading,
    logoSrc,
    logoRounded,
    text
}) {
    return (
        <div>
            <ScreenWrapper
                bgColor={bgColor}
                bgImg={bgImg}
                loading={loading}
            >
                <LoadingComponents>
                    {logoSrc && <Logo src={logoSrc} rounded={logoRounded} />}
                    {loading && spinnerColor
                        && <Spinner
                            name="ball-beat"
                            fadeIn="quarter"
                            color={spinnerColor}
                        />}
                    {text && <Text text={text} textColor={textColor} />}
                </LoadingComponents>
            </ScreenWrapper>
            <LoadableData loading={loading}>
                {children}
            </LoadableData>
        </div>
    );
};

LoadingScreen.propTypes = propTypes;

export default LoadingScreen;
