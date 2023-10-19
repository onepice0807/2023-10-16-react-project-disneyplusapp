import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetParamValue } from '../hooks/useGetParamValue';

const Nav = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const value = useGetParamValue('q');

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // console.log(window.scrollY);

    return () => {
      window.addEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleChangeSearchWord = (e) => {
    navigate(`/search?q=${e.target.value}`);
  };

  // const handleBlur = () => {
  //   if (searchWard !== '') {
  //     navigateSearch();
  //   }
  // };

  // const handleKeyDown = (e) => {
  //   if (e.code === 'Enter') {
  //     navigateSearch();
  //   }
  // };

  // const navigateSearch = () => {
  //   navigate(`/search?q=${searchWard}`);
  // };

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          src="/images/logo.svg"
          alt="Disney Plus Logo"
          onClick={() => (window.location.href = '/')}
        />
      </Logo>
      <Input
        value={value}
        onChange={handleChangeSearchWord}
        // onBlur={handleBlur}
        // onKeyDown={handleKeyDown}
        className="nav__input"
        type="text"
        placeholder="검색어를 입력하세요"
      />
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? 'transparent' : '090b13')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0, 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
    padding: 10px;
  }
`;

const Input = styled.input`
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

  @media (max-width: 768px) {
    display: none;
  }

  &:focus {
    outline: 2px solid rgb(53, 129, 252);
  }
`;
