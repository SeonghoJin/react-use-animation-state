import logo from './logo.svg';
import './App.css';
import {useAnimationState} from "react-typescript-teamplate";

function App() {
  const {onAnimation, offAnimation, state} = useAnimationState('close');
  const {onAnimation: onDelay, offAnimation: offDelay, state : state2} = useAnimationState('close', {
    onDelayType: 'debounce',
    onAnimationTime: 1000,
    offAnimationTime: 1000
  });
  return (
    <div className="App">
      {state}
      <button onClick={() => onAnimation()}>on</button>
      <button onClick={() => offAnimation()}>off</button>
      <br/>
      {state2}
      <button onClick={() => onDelay()}>delayon</button>
      <button onClick={() => offDelay()}>delayoff</button>
    </div>
  );
}

export default App;
