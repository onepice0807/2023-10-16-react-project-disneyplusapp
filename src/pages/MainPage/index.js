import React from 'react';
import styled from 'styled-components';
import Nav from '../../components/Nav';
import Banner from '../../components/Banner';
import Category from '../../components/Category';
import Raw from '../../components/Raw';
import requests from '../../api/request';
import Footer from '../../components/Footer';

const MainPage = () => {
  return (
    <Container>
      <Nav />
      <Banner />
      <Category />
      <Raw title="Trending Now" fetchUrl={requests.fetchTrending} id="TN" />
      <Raw title="Top Rated" fetchUrl={requests.fetchTopRated} id="TR" />
      <Raw
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
        id="AM"
      />
      <Space />
      <Footer />
    </Container>
  );
};

export default MainPage;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    content: '';
    position: absolute;
    background: url('/images/home-background.png') center center / cover
      no-repeat fixed;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

const Space = styled.div`
  height: 150px;
`;
