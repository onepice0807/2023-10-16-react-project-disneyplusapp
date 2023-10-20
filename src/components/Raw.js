import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from './../api/axios'; // 내가 작성한 axios(baseUrl과 params가 있는)
import './Raw.css';
import MovieModal from './MovieModal/MovieModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Raw = ({ title, fetchUrl, id }) => {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달 창을 띄울지 말지 결정하는 State
  const [selectedMovie, setSelectedMovie] = useState({});

  useEffect(() => {
    fetchData();
  }, [fetchUrl]);

  console.log(fetchUrl);

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
    <Container>
      <h2>{title}</h2>

      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          500: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 7,
          },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <img
              key={movie.id}
              className="row__poster"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              onClick={() => handelClick(movie)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
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
