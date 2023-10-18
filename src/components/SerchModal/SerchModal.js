import React, { useState } from 'react';
import './SerchModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SerchModal = ({
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
  const [searchWard, setSearchWard] = useState('');
  const navigate = useNavigate();
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleChangeSearchWord = (e) => {
    setSearchWard(e.target.value);
  };

  const handleBlur = () => {
    if (searchWard !== '') {
      modalSearch();
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === 'Enter') {
      modalSearch();
    }
  };

  const modalSearch = () => {
    navigate(`/search?q=${searchWard}`);
  };

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span className="modal-close" onClick={handleModalClose}>
            <FontAwesomeIcon icon={faX} bounce />
          </span>
          <Input
            value={searchWard}
            onChange={handleChangeSearchWord}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="nav__input"
            type="text"
            placeholder="검색어를 입력하세요"
          />
        </div>
      </div>
    </div>
  );
};

export default SerchModal;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  top: 50px;
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
  width: 500px;
  height: 23px;
  box-shadow: 2px 2px 2px 2px gray;
  @media (max-width: 768px) {
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: rgba(0, 0, 0, 0.582);
    border-radius: 5px;
    color: white;
    padding: 5px;
    border: none;
    width: 500px;
    height: 23px;
    box-shadow: 2px 2px 2px 2px gray;
  }

  &:focus {
    outline: 2px solid rgb(53, 129, 252);
  }
`;
