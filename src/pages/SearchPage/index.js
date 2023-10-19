import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';
import MovieModal from '../../components/MovieModal/MovieModal';
import { useDebounce } from '../../hooks/useDebounce';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { useGetParamValue } from '../../hooks/useGetParamValue';

const SearchPage = () => {
  // const location = useLocation()
  const [searchMovies, setSearchMovies] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달 창을 띄울지 말지 결정하는 State
  const [selectedMovie, setSelectedMovie] = useState({});
  const navigate = useNavigate();

  console.log(useGetParamValue('q'));
  const value = useGetParamValue('q');
  const debouncedSearchWord = useDebounce(value, 1000);
  console.log(debouncedSearchWord);

  useEffect(() => {
    //검색어 영화 검색하기
    if (debouncedSearchWord) {
      fetchSearchMovies();
    }
  }, [debouncedSearchWord]);

  const fetchSearchMovies = async () => {
    try {
      const response = await axios.get(
        `/search/multi?query=${debouncedSearchWord}&page=1`,
      );
      console.log(response);
      setSearchMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  if (searchMovies?.length > 0) {
    return (
      <>
        <Nav />
        <section className="search-container">
          {searchMovies.map((movie) => {
            if (movie.backdrop_path !== null && movie.media_type !== 'person') {
              const movieImgUrl =
                `https://image.tmdb.org/t/p/w500` + movie.backdrop_path;
              return (
                <div className="movie" key={movie.id}>
                  <div
                    className="movie__column-poster"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    <img
                      src={
                        movieImgUrl &&
                        movieImgUrl !==
                          'https://image.tmdb.org/t/p/w500undefined'
                          ? movieImgUrl
                          : './../../images/none.jpg'
                      }
                      alt={movie.title}
                      className="movie__poster"
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
                    <MovieModal
                      {...selectedMovie}
                      setShowModal={setShowModal}
                    />
                  )}
                </div>
              );
            }
          })}
        </section>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Nav />
        <section className="no-results">
          <div className="no-results__text">
            찾고자 하는 검색어 "{debouncedSearchWord}"에 맞는 영화가 없습니다.
          </div>
        </section>
      </>
    );
  }
};

export default SearchPage;
