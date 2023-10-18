import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from './../api/axios'; // 내가 작성한 axios(baseUrl과 params가 있는)
import {
  faHouse,
  faMagnifyingGlass,
  faCloudArrowDown,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import './Footer.css';
import SerchModal from './SerchModal/SerchModal';

const Footer = ({ fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달 창을 띄울지 말지 결정하는 State
  const [selectedMovie, setSelectedMovie] = useState({});

  useEffect(() => {
    fetchData();
  }, [fetchUrl]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  }, [fetchUrl]);

  const handelClick = (movie) => {
    setShowModal(true);
    setSelectedMovie(movie);
    console.log(movie);
  };

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
          key={movies.id}
          className="row__poster"
          src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
          alt={movies.title}
          onClick={() => handelClick(movies)}
        />
        {showModal && <SerchModal setShowModal={setShowModal} />}
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
