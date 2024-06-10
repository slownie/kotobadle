import React, { useState, useEffect } from "react";
import useWordle from "../hooks/useWordle";

const charJP_A = [
  { char: "ぱ" },
  { char: "ば" },
  { char: "だ" },
  { char: "ざ" },
  { char: "が" },
  { char: "わ" },
  { char: "ら" },
  { char: "や" },
  { char: "ま" },
  { char: "は" },
  { char: "な" },
  { char: "た" },
  { char: "さ" },
  { char: "か" },
  { char: "あ" },
];
const charJP_I = [
  { char: "ぴ" },
  { char: "び" },
  { char: "ぢ" },
  { char: "じ" },
  { char: "ぎ" },
  { char: " " },
  { char: "り" },
  { char: " " },
  { char: "み" },
  { char: "ひ" },
  { char: "に" },
  { char: "ち" },
  { char: "し" },
  { char: "き" },
  { char: "い" },
];
const charJP_U = [
  { char: "ぷ" },
  { char: "ぶ" },
  { char: "づ" },
  { char: "ず" },
  { char: "ぐ" },
  { char: "を" },
  { char: "る" },
  { char: "ゆ" },
  { char: "む" },
  { char: "ふ" },
  { char: "ぬ" },
  { char: "つ" },
  { char: "す" },
  { char: "く" },
  { char: "う" },
];
const charJP_E = [
  { char: "ぺ" },
  { char: "べ" },
  { char: "で" },
  { char: "ぜ" },
  { char: "げ" },
  { char: " " },
  { char: "れ" },
  { char: " " },
  { char: "め" },
  { char: "へ" },
  { char: "ね" },
  { char: "て" },
  { char: "せ" },
  { char: "け" },
  { char: "え" },
];
const charJP_O = [
  { char: "ぽ" },
  { char: "ぼ" },
  { char: "ど" },
  { char: "ぞ" },
  { char: "ご" },
  { char: "ん" },
  { char: "ろ" },
  { char: "よ" },
  { char: "も" },
  { char: "ほ" },
  { char: "の" },
  { char: "と" },
  { char: "そ" },
  { char: "こ" },
  { char: "お" },
];
const charFunc = [{ char: "Delete" }, { char: "Enter" }];

export default function Keypad({ solution }) {
  const {currentGuess, setCurrentGuess, buttonPress} = useWordle(solution)

  // const buttonPress = ({ char }) => {
  //   if (char === "Enter") {
  //     // 1. Turn must be less than 5
  //     console.log("Game sux")
      
  //     return;
  //   }

  //   if (char === "Delete") {
  //     setCurrentGuess((prev) => {
  //       return prev.slice(0, -1);
  //     });
  //     return;
  //   }

  //   if (currentGuess.length < 3) {
  //     setCurrentGuess((prev) => {
  //       console.log(prev + char);
  //       return prev + char;
  //     });
  //   }
  // };

  return (
    <div>
      <table className="keypad">
        <tbody>
          {/* あ Line */}
          <tr>
            {charJP_A &&
              charJP_A.map((c) => {
                return (
                  <td>
                    {c.char === " " ? (
                      <></>
                    ) : (
                      <input
                        key={c.char}
                        className="bt"
                        type="button"
                        value={c.char}
                        onClick={() => buttonPress(c)}
                      />
                    )}
                  </td>
                );
              })}
          </tr>

          {/* い Line */}
          <tr>
            {charJP_I &&
              charJP_I.map((c) => {
                return (
                  <td>
                    {c.char === " " ? (
                      <></>
                    ) : (
                      <input
                        key={c.char}
                        className="bt"
                        type="button"
                        value={c.char}
                        onClick={() => buttonPress(c)}
                      />
                    )}
                  </td>
                );
              })}
          </tr>

          {/* う Line */}
          <tr>
            {charJP_U &&
              charJP_U.map((c) => {
                return (
                  <td>
                    {c.char === " " ? (
                      <></>
                    ) : (
                      <input
                        key={c.char}
                        className="bt"
                        type="button"
                        value={c.char}
                        onClick={() => buttonPress(c)}
                      />
                    )}
                  </td>
                );
              })}
          </tr>

          {/* え Line */}
          <tr>
            {charJP_E &&
              charJP_E.map((c) => {
                return (
                  <td>
                    {c.char === " " ? (
                      <></>
                    ) : (
                      <input
                        key={c.char}
                        className="bt"
                        type="button"
                        value={c.char}
                        onClick={() => buttonPress(c)}
                      />
                    )}
                  </td>
                );
              })}
          </tr>

          {/* お Line */}
          <tr>
            {charJP_O &&
              charJP_O.map((c) => {
                return (
                  <td>
                    {c.char === " " ? (
                      <></>
                    ) : (
                      <input
                        key={c.char}
                        className="bt"
                        type="button"
                        value={c.char}
                        onClick={() => buttonPress(c)}
                      />
                    )}
                  </td>
                );
              })}
          </tr>
          <tr>
            {charFunc &&
              charFunc.map((c) => {
                return (
                  <td>
                    {c.char === " " ? (
                      <></>
                    ) : (
                      <input
                        key={c.char}
                        className="bt"
                        type="button"
                        value={c.char}
                        onClick={() => buttonPress(c)}
                      />
                    )}
                  </td>
                );
              })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
