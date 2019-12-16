import React from "react";
import { StyledInstructions } from "./styles/StyledInstructions";

const Instructions = ({ gameOver, text }) => (
  <StyledInstructions gameOver={gameOver}>{text}</StyledInstructions>
);

export default Instructions;
