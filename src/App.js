import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import DetailPage from './pages/DetailPage';
import SwiperTest from './pages/SearchPage/SwiperTest';

function App() {
  const Layout = () => {
    return <Outlet />;
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          {/* 시작페이지 설정 index */}
          <Route path="main" element={<MainPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="movie/:movieId" element={<DetailPage />} />
          <Route path="swiper" element={<SwiperTest />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
