import UI from "./components/UI";
import { LanguageContext } from "./store/languageContext";
import words from "./words.json";
import { useContext } from "react";

function App() {
  const randomIndex = Math.floor(Math.random() * words.length);
  const answer = words[randomIndex];

  const { language } = useContext(LanguageContext);

  return (
    <div className="App">
      <div className="Navbar">
        <h1>言葉dle (Kotobadle)</h1>
      </div>

      {answer && <UI solution={answer} />}
    </div>
  );
}

export default App;
