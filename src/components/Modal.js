import React from "react";

export default function Modal({ isCorrect, solution, turn }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <h2>{solution[1]}</h2>
          <p>{solution[0]}</p>
          <p>You found the solution in {turn} guesses.</p>
        </div>
      )}

      {!isCorrect && (
        <div>
          <h1>You lose...</h1>
          <h2 className="solution">{solution[1]}</h2>
          <p className="solution">{solution[0]}</p>
          <p>Better luck next time.</p>
        </div>
      )}
    </div>
  );
}
