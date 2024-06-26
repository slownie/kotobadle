import Game from "./components/Game";
import { LanguageContext } from "./store/languageContext";
import { ThemeContext } from "./store/themeContext";
import words from "./words.json";
import { useContext } from "react";

function App() {
  const randomIndex = Math.floor(Math.random() * words.length);
  const answer = words[randomIndex];

  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="light">
      <div>
        <h1>言葉dle (Kotobadle)</h1>
      </div>

      {answer && <Game solution={answer} />}
    </div>
  );
}

export default App;
