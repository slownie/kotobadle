import React, { useState, useEffect } from "react";
import chars from '../chars.json';

export function Keypad({ usedKeys }) {

  return (
    <div className="keypad">
      {chars.map(c => {
        const color = usedKeys[c]
        return (
          <div key={c} className={color}>{c}</div>
        )
      })}
    </div>
  );
}
