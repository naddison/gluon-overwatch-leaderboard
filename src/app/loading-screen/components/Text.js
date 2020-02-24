import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import media from '../media.conf.js';

const Title = styled.p`
  text-align: 'center';
  word-wrap: break-word;
  color: #FCA311;
  font-family: 'BlizzardBold';
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 1);

  ${media.largest`
    font-size: 30px;
  `}

  ${media.desktop`
    font-size: 22px;
  `}

  ${media.tablet`
    font-size: 20px;
  `}

  ${media.phone`
    font-size: 15px;
  `}
`;

const propTypes = {
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string
};

const Text = function({
    text
}) {
    return (
        <Title>{text}</Title>
    );
};

Text.PropTypes = propTypes;

export default Text;
