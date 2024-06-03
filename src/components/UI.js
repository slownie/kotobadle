import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";

import Grid from "./Grid";
import Keypad from "./Keypad";

export default function UI({ solution }) {
  const { currentGuess, handleKeyup, guesses, setCurrentGuess, turn, usedKeys } = useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn}/>
      <Keypad usedKeys={usedKeys} currentGuess={currentGuess} setCurrentGuess={setCurrentGuess}/>
    </div>
  );
}
