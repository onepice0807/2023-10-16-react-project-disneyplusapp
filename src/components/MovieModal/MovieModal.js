import React, { useCallback, useRef, useState } from 'react';
import './MovieModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import useOnclickOutSide from '../../hooks/useOnclickOutSide';
import styled from 'styled-components';

const MovieModal = ({
  backdrop_path,
  original_title,
  overview,
  poster_path,
  release_date,
  title,
  status,
  vote_average,
  setShowModal,
  videos,
  profile_path,
}) => {
  const modalRef = useRef();
  const [likeContent, setLikeContent] = useState(false);
  const [isPlay, setIsPlay] = useState(false); // 플레이했는지 안했는지
  const handleModalClose = () => {
    setShowModal(false);
  };

  useOnclickOutSide(
    modalRef,
    useCallback(() => {
      setShowModal(false);
    }),
    [],
  );

  console.log(backdrop_path);
  console.log(videos);
  if (isPlay) {
    // 플레이 버튼을 눌렀을경우
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              // src={`https://www.youtube.com/embed/${videos.results[0].key}?controls=0&autoplay=1&loop=1`}
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
      <div className="presentation" role="presentation">
        <div className="wrapper-modal">
          <div className="modal" ref={modalRef}>
            <span className="modal-close" onClick={handleModalClose}>
              <FontAwesomeIcon icon={faX} bounce />
            </span>
            <img
              className="modal__poster-img"
              src={
                backdrop_path && backdrop_path !== 'undefined'
                  ? `https://image.tmdb.org/t/p/original${backdrop_path}`
                  : './../../images/none.jpg'
              }
              alt={title}
            />
            <button
              className="modal__poster-button"
              onClick={() => setIsPlay(true)}
            >
              <FontAwesomeIcon icon={faPlay} beat /> 재 생
            </button>
            {/* 좋아요 버튼 */}
            <div className="modal__likeContent-button">
              <button
                onClick={() => {
                  setLikeContent(!likeContent);
                }}
              >
                {likeContent ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faPlus} />
                )}{' '}
                관심 컨텐츠
              </button>
            </div>
            <p className="modal__poster-overview">{overview}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default MovieModal;

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
