import React from "react";

const MyButton = ({ disabled, text }) => (
  <button disabled={disabled}>{text}</button>
);
export default MyButton;
