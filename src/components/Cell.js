import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETROMINOES } from "./../utils/tetrominoes";

const Cell = ({ type }) => (
  <StyledCell type={"L"} color={TETROMINOES["L"].color} />
);

export default Cell;
