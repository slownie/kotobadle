import React, { useState } from "react";

export default function TextInput() {
  const [text, setText] = useState("");
  const transcribe = ({ char }) => {
    switch ({ char }) {
      // Vowels ()
      case "a":
        setText((prev) => {
          switch (prev) {
            case "k":
              return prev - 1 + "か";
            default:
              return prev + "あ";
          }
        });
        break;
      default:
        setText((prev) => {
          return prev + char;
        });
    }
  };
  return (
    <div>
      <p>{text}</p>
      <input
        type="text"
        maxLength="3"
        onChange={transcribe}
        pattern="[a-zぁ-ん]"
      />
    </div>
  );
}
