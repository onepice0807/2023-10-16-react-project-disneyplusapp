import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faMagnifyingGlass,
  faCloudArrowDown,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="home-icon">
        <FontAwesomeIcon
          icon={faHouse}
          size="2x"
          style={{ color: '#4f5869' }}
        />
      </div>
      <div className="home-icon">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="2x"
          style={{ color: '#4f5869' }}
        />
      </div>
      <div className="home-icon">
        <FontAwesomeIcon
          icon={faCloudArrowDown}
          size="2x"
          style={{ color: '#4f5869' }}
        />
      </div>
      <div className="home-icon">
        <FontAwesomeIcon icon={faUser} size="2x" style={{ color: '#4f5869' }} />
      </div>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  height: 100px;
  background-color: ${(props) => (props.show ? 'transparent' : 'black')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 3;
`;
