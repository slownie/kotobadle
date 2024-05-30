import React, { useState, useEffect } from "react";
export function Keypad({ usedKeys }) {
  return (
    <div>
      <table>
        <tr>
          <td>a</td>
          <td></td>
          <td>ka</td>
        </tr>
        <tr>
          <td>
            <input type="button" value="あ" />
          </td>
          <td></td>
          <td>
            <input type="button" value="か" />
          </td>
        </tr>
      </table>
    </div>
  );
}
