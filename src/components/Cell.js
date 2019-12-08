import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETROMINOES } from "./../utils/tetrominoes";

const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOES[type].color}>
    CELL
  </StyledCell>
);

export default Cell;
