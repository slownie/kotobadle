import React, { useState } from "react";

export default function TextInput() {
  let text = "";

  return (
    <div>
      <input type="text" maxLength="3" value={text} />
    </div>
  );
}
