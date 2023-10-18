import React from 'react';
import './MovieModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

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
}) => {
  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span className="modal-close" onClick={handleModalClose}>
            <FontAwesomeIcon icon={faX} bounce />
          </span>
          <img
            className="modal__poster-img"
            src={
              `https://image.tmdb.org/t/p/original${backdrop_path}`
                ? `https://image.tmdb.org/t/p/original${backdrop_path}`
                : 'https://www.shutterstock.com/image-illustration/none-flat-icon-260nw-1266167038.jpg'
            }
            alt={title}
          />
          <button className="modal__poster-button">
            <FontAwesomeIcon icon={faPlay} beat /> 재 생
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
