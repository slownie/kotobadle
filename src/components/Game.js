import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";

import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";
import TextInput from "./TextInput";

export default function Game({ solution }) {
  const { currentGuess, guesses, turn, usedKeys, buttonPress, isCorrect } =
    useWordle(solution[0]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
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
      <TextInput />
    </div>
  );
}
