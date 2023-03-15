import { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import Clock from './components/Clock';
import { startClock, stopClock } from './redux/clockSlice';
import styled from 'styled-components';

const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;
  align-items: center;
`;

function App() {
  const dispatch = useAppDispatch();
  const isStart = useAppSelector(s => s.clock.isStart);

  const toggleClock = () => dispatch(isStart ? stopClock() : startClock());
  useEffect(() => {
    dispatch(startClock());
    return () => { dispatch(stopClock()); };
  }, [dispatch]);

  return (
    <div className="App">

      <button style={{
        width: "100px",
        height: "100px"
      }} onClick={toggleClock}>
        {isStart ? "Stop" : "Start"}
      </button>
      <Body>
        <Clock />
        <Clock />
        <Clock />
        <Clock />
        <Clock />
      </Body>

    </div>
  );
}

export default App;
