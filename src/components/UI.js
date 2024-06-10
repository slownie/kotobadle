import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";

import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

export default function UI({ solution }) {
  const {
    currentGuess,
    handleKeyup,
    guesses,
    turn,
    usedKeys,
    buttonPress,
    isCorrect,
  } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isCorrect) {
      console.log("Ran");
      setTimeout(() => setShowModal(true), 1000);
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 1000);
    }
  }, [isCorrect, turn]);

  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad buttonPress={buttonPress} usedKeys={usedKeys} />
      <p></p>
      {solution}
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </div>
  );
}
