import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchPage.css';
import MovieModal from '../../components/MovieModal/MovieModal';

const SearchPage = () => {
  // const location = useLocation()
  const [searchMovies, setSearchMovies] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달 창을 띄울지 말지 결정하는 State
  const [selectedMovie, setSelectedMovie] = useState({});
  const useQuery = () => {
    // URLSearchParams 객체 : URL주소에서 uri와 querystring을 가지고 있는 객체
    // useLocation : URL 주소창의 uri와 querystring을 반환해주는 react Hook
    return new URLSearchParams(useLocation().search);
  };
  const queryString = useQuery();
  const searchWord = queryString.get('q');
  console.log(searchWord);

  useEffect(() => {
    //검색어 영화 검색하기
    fetchSearchMovies();
  }, [searchWord]);

  const fetchSearchMovies = async () => {
    try {
      const response = await axios.get(
        `/search/multi?query=${searchWord}&page=2`,
      );
      console.log(response);
      setSearchMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handelClick = (movie) => {
    setShowModal(true);
    setSelectedMovie(movie);
    console.log(movie);
  };

  if (searchMovies?.length > 0) {
    return (
      <section className="search-container">
        {searchMovies.map((movie) => {
          if (movie.backdrop_path !== null) {
            const movieImgUrl =
              `https://image.tmdb.org/t/p/w500` + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div className="movie__column-poster">
                  <img
                    src={movieImgUrl}
                    alt={movie.title}
                    className="movie__poster"
                    onClick={() => handelClick(movie)}
                  />
                </div>
                <div>
                  제목 : {movie.title ? movie.title : movie.original_name}
                </div>
                <div>
                  출시일 :{' '}
                  {movie.first_air_date
                    ? movie.first_air_date
                    : movie.release_date}
                </div>
                {showModal && (
                  <MovieModal {...selectedMovie} setShowModal={setShowModal} />
                )}
              </div>
            );
          }
        })}
      </section>
    );
  } else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          찾고자 하는 검색어 "{searchWord}"에 맞는 영화가 없습니다.
        </div>
      </section>
    );
  }
};

export default SearchPage;
