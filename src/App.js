import styled from 'styled-components';
import './App.css';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      <Container>
        <Nav />
      </Container>
    </div>
  );
}

export default App;

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
