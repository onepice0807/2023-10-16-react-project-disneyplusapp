import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import DetailPage from './pages/DetailPage';
import Nav from './components/Nav';
import Footer from './components/Footer';
import MyPage from './pages/MyPage';

function App() {
  const Layout = () => {
    return (
      <div>
        <Outlet />
        <Nav />
      </div>
    );
  };

  const Layout2 = () => {
    return (
      <div>
        <Outlet />
        <Footer />
      </div>
    );
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          {/* 시작페이지 설정 index */}
          <Route path="/" element={<Layout2 />}>
            <Route path="main" element={<MainPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="movie/:movieId" element={<DetailPage />} />
            <Route path="mypage" element={<MyPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
