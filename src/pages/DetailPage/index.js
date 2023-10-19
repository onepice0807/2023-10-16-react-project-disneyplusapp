import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailPage.css';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get(`/movie/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        // 영화 데이터를 가져오지 못한 경우
        if (error.response.status === 404) {
          // 404 오류 처리
        } else {
          // 다른 오류 처리
        }
      }
      setIsLoading(false);
    }
    fetchData();
  }, [movieId]);

  if (isLoading && !movie) {
    return <div>Loading...</div>;
  } else if (!movie) {
    // 영화 데이터를 가져오지 못한 경우

    return <div>Error</div>;
  } else {
    return (
      <div className="presentation" role="presentation">
        <div className="wrapper-detail">
          <div className="detail">
            <section>
              <img
                className="detail__poster-img"
                src={
                  `https://image.tmdb.org/t/p/original${movie.backdrop_path}` &&
                  `https://image.tmdb.org/t/p/original${movie.backdrop_path}` !==
                    'https://image.tmdb.org/t/p/originalundefined'
                    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    : './../../images/none.png'
                }
                fallbackImage="./../../images/none.jpg"
                alt={movie.title}
              />
              <button className="detail__poster-button">
                <FontAwesomeIcon icon={faPlay} beat /> 재 생
              </button>
            </section>
          </div>
        </div>
      </div>
    );
  }
};

export default DetailPage;
