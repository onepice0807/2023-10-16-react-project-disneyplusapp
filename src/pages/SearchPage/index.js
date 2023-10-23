import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';
import { useDebounce } from '../../hooks/useDebounce';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { useGetParamValue } from '../../hooks/useGetParamValue';

const SearchPage = () => {
  // const location = useLocation()
  const [searchMovies, setSearchMovies] = useState([]);
  const navigate = useNavigate();

  const [curPageNo, setCurPageNo] = useState(1);

  console.log(useGetParamValue('q'));
  const value = useGetParamValue('q');
  const debouncedSearchWord = useDebounce(value, 1000);
  console.log(debouncedSearchWord);

  const handleScroll = () => {
    // console.log(
    //   '문서의 총높이(스크롤 되어 보이지 않는 영역까지 포함',
    //   document.documentElement.scrollHeight,
    // );

    // console.log(
    //   '스크롤 되어 보이지 않는 영역의 높이',
    //   document.documentElement.scrollTop,
    // );

    // console.log(
    //   '유저에게 보여지는 화면의 높이',
    //   document.documentElement.clientHeight,
    // );
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      setCurPageNo(curPageNo + 1); // 페이지 번호 1 증가
      fetchSearchMovies();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  // 스크롤 이벤트를 웹 문서에 장착
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      // <SearchPage />가 언마운트 될때는 스크롤 이벤트 핸들러 해제
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    //검색어 영화 검색하기
    if (debouncedSearchWord) {
      fetchSearchMovies();
    }
  }, [debouncedSearchWord]);

  const fetchSearchMovies = async () => {
    try {
      const response = await axios.get(
        `/search/movie?query=${debouncedSearchWord}&page=${curPageNo}`,
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
