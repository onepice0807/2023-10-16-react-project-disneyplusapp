import React, { useEffect, useState } from 'react';
import axios from './../api/axios'; // 내가 작성한 axios(baseUrl과 params가 있는)
import requests from './../api/request';
import styled from 'styled-components';
import './Banner.css';

const Banner = () => {
  const [bannerMovieDetail, setBannerMovieDetail] = useState({});
  const [isPlay, setIsPlay] = useState(false); // 플레이했는지 안했는지
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(requests.fetchNowPlaying);
      //   console.log(response);
      const bannerMovieId =
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ].id; // 랜덤하게 뽑은 영화 1개의 대략적인 정보

      console.log(bannerMovieId);

      const { data: bannerMovieDetail } = await axios.get(
        `movie/${bannerMovieId}`,
        {
          params: {
            append_to_response: 'videos',
          },
        },
      ); // bannerMovieI의 영화 상세정보를 가져옴

      console.log(bannerMovieDetail);
      setBannerMovieDetail(bannerMovieDetail);
    } catch (err) {
      console.error(err);
    }
  };

  // 영화 overview정보를 length길이만큼 잘라주고 ...을 붙여주는 함수
  const truncate = (text, length) => {
    return text?.length > length ? `${text.substring(0, length)}...` : text;
  };

  if (isPlay) {
    // 플레이 버튼을 눌렀을경우
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${bannerMovieDetail.videos.results[0].key}?controls=0&autoplay=1&loop=1`}
              width="640"
              height="300"
              allow="autoplay: fullscreen"
            ></Iframe>
          </HomeContainer>
        </Container>
        <button className="video-close" onClick={() => setIsPlay(false)}>
          X
        </button>
      </>
    );
  } else {
    // 플레이 버튼을 누르지 않았을경우
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${bannerMovieDetail.backdrop_path}")`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover',
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {bannerMovieDetail.title ||
              bannerMovieDetail.name ||
              bannerMovieDetail.original_name}
          </h1>
          <div className="banner_button">
            {bannerMovieDetail.videos?.results[0]?.key && true}
            <button
              className="banner_button play"
              onClick={() => setIsPlay(true)}
            >
              play
            </button>
          </div>

          <p className="banner_description">
            {bannerMovieDetail.overview &&
              truncate(bannerMovieDetail.overview, 100)}
          </p>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
    );
  }
};

export default Banner;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
