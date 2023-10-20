import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetParamValue } from '../hooks/useGetParamValue';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const Nav = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const value = useGetParamValue('q');

  const initUserData = sessionStorage.getItem('userData')
    ? JSON.parse(sessionStorage.getItem('userData'))
    : {};
  const [userData, setUserData] = useState(initUserData);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user', user);
        if (pathname === '/') {
          navigate('/main');
        }
      } else {
        navigate('/');
      }
    });
  }, [auth, pathname]); // 인증 상태가 변하거나 유저가 패스워드를 바꿀때 변경

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

  const handelAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result); // 로그인 성공하면 사용자 정보를 result로 보내줌
        setUserData(result.user);
        sessionStorage.setItem('userData', JSON.stringify(result.user));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 로그아웃 버튼을 눌렀을 경우
  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.clear();
        setUserData({});
        navigate('/');
      })
      .catch((error) => console.error(error));
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

      {pathname === '/' ? (
        <Login onClick={handelAuth}>Login</Login>
      ) : (
        <>
          <Input
            value={value}
            onChange={handleChangeSearchWord}
            // onBlur={handleBlur}
            // onKeyDown={handleKeyDown}
            className="nav__input"
            type="text"
            placeholder="검색어를 입력하세요"
          />
          <SignOut>
            <UserImg src={userData.photoURL} alt="userImg" />
            <DropDown onClick={handleSingOut}>Sign Out</DropDown>
          </SignOut>
        </>
      )}
    </NavWrapper>
  );
};

export default Nav;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
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
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.show ? '#090b13' : 'transparent')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
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
  }
`;
