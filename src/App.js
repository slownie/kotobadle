import UI from "./components/UI";
import { LanguageContext } from "./store/languageContext";
import words from "./words.json";
import { useContext, useState } from "react";

function App() {
  const randomIndex = Math.floor(Math.random() * words.length);
  const answer = words[randomIndex];
  const [inputValue, setInputValue] = useState("");

  const {language} = useContext(LanguageContext);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const transcribe = () => {};

  return (
    <div className="App">
      <div className="Navbar">
        <h1>言葉dle (Kotobadle)</h1>
      </div>

      {answer && <UI solution={answer} />}
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
