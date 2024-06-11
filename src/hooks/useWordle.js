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
      console.log(prevUsedKeys);
      return prevUsedKeys;
    });

    setCurrentGuess("");
  };

  const buttonPress = ({ char }) => {
    if (char === "Enter") {
      console.log("Pressed");
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

    if (char === "Delete") {
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

  return {
    turn,
    currentGuess,
    setCurrentGuess,
    guesses,
    isCorrect,
    buttonPress,
    usedKeys,
  };
};
export default useWordle;
