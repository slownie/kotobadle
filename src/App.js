import UI from "./components/UI";
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
    <div className={theme ? "light" : "dark"}>
      <h1>言葉dle (Kotobadle)</h1>
      {answer && <UI solution={answer} />}
    </div>
  );
}

export default App;
