import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState(""); // What the user is currently typing
  const [guesses, setGuesses] = useState([...Array(6)]); // Formatted guesses
  const [history, setHistory] = useState([]); // Plain-string guesses
  const [isCorrect, setIsCorrect] = useState(false); // Victory
  const [usedKeys, setUsedKeys] = useState({});

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    // Correct chracter/placement
    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    // Correct character, wrong placement
    formattedGuess.forEach((l, i) => {
      if (solution.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    // Is this the correct answer?
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    // It wasn't so add it to the list
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });

    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((l) => {
        const currentColor = prevUsedKeys[l.key];

        if (l.color === "green") {
          prevUsedKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[l.key] = "yellow";
          return;
        }
        if (l.color === "grey" && currentColor !== ("green" || "yellow")) {
          prevUsedKeys[l.key] = "grey";
          return;
        }
      });
      return prevUsedKeys;
    });

    setCurrentGuess("");
  };

  const buttonPress = ({ char }) => {
    if (char === "Enter" || char === "➤") {
      // 1. Turn must be less than 5
      if (turn > 5) {
        return "You've used all your guesses.";
      }

      // Do not allow duplicates
      if (history.includes(currentGuess)) {
        console.log("You already guessed that word");
        return;
      }

      // Word must be 3 characters long
      if (currentGuess.length !== 3) {
        return "Word must be 3 characters";
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (char === "Delete" || char === "⌫") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (currentGuess.length < 3) {
      setCurrentGuess((prev) => {
        return prev + char;
      });
    }
  };

  const handleKeyUp = ({ key }) => {
    if (key === "Enter") {
      // 1. Turn must be less than 5
      if (turn > 5) {
        return "You've used all your guesses.";
      }

      // Do not allow duplicates
      if (history.includes(currentGuess)) {
        console.log("You already guessed that word");
        return;
      }

      // Word must be 3 characters long
      if (currentGuess.length !== 3) {
        return "Word must be 3 characters";
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === "Delete" || key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    // There's probably some traditional way to do this but
    if (/^[A-Za-zぁ-ん]$/.test(key)) {
      if (currentGuess.length < 3 || /[a-zA-z]/g.test(currentGuess)) {
        switch (key) {
          case "a":
            // There was a consonant before
            switch (currentGuess[currentGuess.length - 1]) {
              case "k":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "か"
                );
                break;
              case "s":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "さ"
                );
                break;
              case "t":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "た"
                );
                break;
              case "n":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "な"
                );
                break;
              case "h":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "は"
                );
                break;
              case "m":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ま"
                );
                break;
              case "y":
                switch (currentGuess[currentGuess.length - 2]) {
                  case "k":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "きゃ"
                    );
                    break;
                  case "g":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "ぎゃ"
                    );
                    break;
                  case "s":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "しゃ"
                    );
                    break;
                  case "j":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "じゃ"
                    );
                    break;
                  case "c":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "ちゃ"
                    );
                    break;
                  case "n":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "にゃ"
                    );
                    break;
                  case "h":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "ひゃ"
                    );
                    break;
                  case "b":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "びゃ"
                    );
                    break;
                  case "p":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "ぴゃ"
                    );
                    break;
                  case "m":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "みゃ"
                    );
                    break;
                  case "r":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "りゃ"
                    );
                    break;

                  default:
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -1) + "や"
                    );
                }
                break;

              case "r":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ら"
                );
                break;
              case "w":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "わ"
                );
                break;
              case "g":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "が"
                );
                break;
              case "z":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ざ"
                );
                break;
              case "d":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "だ"
                );
                break;
              case "b":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ば"
                );
                break;
              case "p":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ぱ"
                );
                break;

              // No matching consonant
              default:
                setCurrentGuess((prev) => prev + "あ");
            }
            break;

          case "i":
            // There was a consonant before
            switch (currentGuess[currentGuess.length - 1]) {
              case "k":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "き"
                );
                break;
              case "s":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "し"
                );
                break;
              case "c":
              case "t":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ち"
                );
                break;
              case "n":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "に"
                );
                break;
              case "h":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ひ"
                );
                break;
              case "m":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "み"
                );
                break;

              case "r":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "り"
                );
                break;
              case "g":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ぎ"
                );
                break;
              case "j":
              case "z":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "じ"
                );
                break;
              case "d":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ぢ"
                );
                break;
              case "b":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "び"
                );
                break;
              case "p":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ぴ"
                );
                break;

              // No matching consonant
              default:
                setCurrentGuess((prev) => prev + "い");
            }
            break;

          case "u":
            // There was a consonant before
            switch (currentGuess[currentGuess.length - 1]) {
              case "k":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "く"
                );
                break;
              case "s":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "す"
                );
                break;
              case "t":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "つ"
                );
                break;
              case "n":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ぬ"
                );
                break;
              case "h":
              case "f":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ふ"
                );
                break;
              case "m":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "む"
                );
                break;
              case "y":
                switch (currentGuess[currentGuess.length - 2]) {
                  case "k":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "きゅ"
                    );
                    break;
                  case "g":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "ぎゅ"
                    );
                    break;
                  case "s":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "しゅ"
                    );
                    break;
                  case "j":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "じゅ"
                    );
                    break;
                  case "c":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "ちゅ"
                    );
                    break;
                  case "n":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "にゅ"
                    );
                    break;
                  case "h":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "ひゅ"
                    );
                    break;
                  case "b":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "びゅ"
                    );
                    break;
                  case "p":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "ぴゅ"
                    );
                    break;
                  case "m":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "みゅ"
                    );
                    break;
                  case "r":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "りゅ"
                    );
                    break;

                  default:
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -1) + "ゆ"
                    );
                }
                break;

              case "r":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "る"
                );
                break;
              case "g":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ぐ"
                );
                break;
              case "z":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ず"
                );
                break;
              case "d":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "づ"
                );
                break;
              case "b":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ぶ"
                );
                break;
              case "p":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ぷ"
                );
                break;

              // No matching consonant
              default:
                setCurrentGuess((prev) => prev + "う");
            }
            break;

          case "e":
            // There was a consonant before
            switch (currentGuess[currentGuess.length - 1]) {
              case "k":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "け"
                );
                break;
              case "s":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "せ"
                );
                break;
              case "t":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "て"
                );
                break;
              case "n":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ね"
                );
                break;
              case "h":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "へ"
                );
                break;
              case "m":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "め"
                );
                break;

              case "r":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "れ"
                );
                break;
              case "g":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "げ"
                );
                break;
              case "z":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ぜ"
                );
                break;
              case "d":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "で"
                );
                break;
              case "b":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "べ"
                );
                break;
              case "p":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ぺ"
                );
                break;

              // No matching consonant
              default:
                setCurrentGuess((prev) => prev + "え");
            }
            break;

          case "o":
            // There was a consonant before
            switch (currentGuess[currentGuess.length - 1]) {
              case "k":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "こ"
                );
                break;
              case "s":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "そ"
                );
                break;
              case "t":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "と"
                );
                break;
              case "n":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "の"
                );
                break;
              case "h":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ほ"
                );
                break;
              case "m":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "も"
                );
                break;
              case "y":
                switch (currentGuess[currentGuess.length - 2]) {
                  case "k":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "きょ"
                    );
                    break;
                  case "g":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "ぎょ"
                    );
                    break;
                  case "s":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "しょ"
                    );
                    break;
                  case "j":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "じょ"
                    );
                    break;
                  case "c":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "ちょ"
                    );
                    break;
                  case "n":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "にょ"
                    );
                    break;
                  case "h":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "ひょ"
                    );
                    break;
                  case "b":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "びょ"
                    );
                    break;
                  case "p":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "ぴょ"
                    );
                    break;
                  case "m":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "みょ"
                    );
                    break;
                  case "r":
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -2) + "りょ"
                    );
                    break;

                  default:
                    setCurrentGuess(
                      (currentGuess) => currentGuess.slice(0, -1) + "よ"
                    );
                }
                break;

              case "r":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ろ"
                );
                break;
              case "w":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "を"
                );
                break;
              case "g":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ご"
                );
                break;
              case "z":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ぞ"
                );
                break;
              case "d":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ど"
                );
                break;
              case "b":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ぼ"
                );
                break;
              case "p":
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "ぽ"
                );
                break;

              // No matching consonant
              default:
                setCurrentGuess((prev) => prev + "お");
            }
            break;

          case "n":
            if (currentGuess[currentGuess.length - 1] === "n") {
              setCurrentGuess(
                (currentGuess) => currentGuess.slice(0, -1) + "ん"
              );
            } else {
              setCurrentGuess((prev) => prev + "n");
            }
            break;

          default:
            switch (currentGuess[currentGuess.length - 1]) {
              case key:
                setCurrentGuess(
                  (currentGuess) => currentGuess.slice(0, -1) + "っ"
                );
                break;

              default:
                setCurrentGuess((prev) => prev + key);
            }
        }
      }
    }
  };

  return {
    turn,
    currentGuess,
    setCurrentGuess,
    guesses,
    isCorrect,
    buttonPress,
    usedKeys,
    handleKeyUp,
  };
};
export default useWordle;
