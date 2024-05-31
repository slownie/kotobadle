import UI from "./components/UI";
import { Keypad } from "./components/Keypad";
import words from "./words.json";
import { useState } from "react";

function App() {
  const randomIndex = Math.floor(Math.random() * words.length);
  const answer = words[randomIndex];
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const transcribe = () => {};

  return (
    <div className="App">
      {answer && <UI solution={answer} />}
      <Keypad />
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={transcribe}
      />
    </div>
  );
}

export default App;
