import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";

import Grid from "./Grid";
import Keypad from "./Keypad";

export default function UI({ solution }) {
  const { currentGuess, handleKeyup, guesses, turn, usedKeys, buttonPress } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad buttonPress={buttonPress} usedKeys={usedKeys} />
      <p></p>
      {solution}
    </div>
  );
}
