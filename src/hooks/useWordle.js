import { useState } from "react";
const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState(""); // What the user is currently typing
  const [guesses, setGuesses] = useState([...Array(6)]); // Formatted guesses
  const [history, setHistory] = useState([]); // Plain-string guesses
  const [isCorrect, setIsCorrect] = useState(false); // Victory

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return {key: l, color: 'grey'};
    })

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);

      setGuesses(prevGuess => {
        let addNewGuess = [...prevGuess]
      })
    }
  };

  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      // Only add guess if turn is less than 5
      if (turn > 5) {
        console.log("You've used all your guesses")
        return;
      }

      // Do not allow duplicates
      if (history.includes(currentGuess)) {
        console.log("You already guessed that word");
          return;
      }

      // Word must be 3 characters long
      if (currentGuess.length !== 3) {
        console.log("Word must be 3 characters");
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    // I don't know if this works with Japanese keyboards but it should??
    if (/^[A-Za-z]$/.test(key) || /^[あ-ん]$/.test(key)) {
      console.log(key);
      if (currentGuess.length < 3) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, setCurrentGuess, guesses, isCorrect, handleKeyup };
};
export default useWordle;
