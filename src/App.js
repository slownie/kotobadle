import './App.css';
import UI from './components/UI';
import words from "./words.json";


function App() {
  const randomIndex = Math.floor(Math.random()*words.length);
  const answer=words[randomIndex];

  return (
    <div className="App">
      {answer && <UI solution={answer}/>}
    </div>
  );
}

export default App;
