import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchPage.css';

const SearchPage = () => {
  // const location = useLocation()
  const [searchMovies, setSearchMovies] = useState([]);
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
                  />
                </div>
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
