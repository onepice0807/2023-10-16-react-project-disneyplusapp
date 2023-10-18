import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from './../api/axios'; // 내가 작성한 axios(baseUrl과 params가 있는)
import './Raw.css';
import MovieModal from './MovieModal/MovieModal';

const Raw = ({ title, fetchUrl, id }) => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달 창을 띄울지 말지 결정하는 State
  const [selectedMovie, setSelectedMovie] = useState({});

  useEffect(() => {
    fetchData();
  }, [fetchUrl]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(fetchUrl);
      // console.log(response);
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
    <Container>
      <h2>{title}</h2>
      <div className="slider">
        <div
          className="slider__arrow-left"
          onClick={() => {
            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
          }}
        >
          <span className="arrow">{'<'}</span>
        </div>
        <div className="row__posters" id={id}>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              onClick={() => handelClick(movie)}
            />
          ))}
        </div>
        <div
          className="slider__arrow-right"
          onClick={() => {
            document.getElementById(id).scrollLeft += window.innerWidth - 80;
          }}
        >
          <span className="arrow">{'>'}</span>
        </div>
      </div>
      {showModal && (
        <MovieModal {...selectedMovie} setShowModal={setShowModal} />
      )}
    </Container>
  );
};

export default Raw;

const Container = styled.div`
  padding: 0 0 26px;
`;
