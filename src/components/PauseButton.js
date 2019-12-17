import React from "react";
import { StyledPauseButton } from "./styles/StyledPauseButton";

const PauseButton = ({ gamePaused, callback, text }) => (
  <StyledPauseButton gamePaused={gamePaused} onClick={callback}>
    {text}
  </StyledPauseButton>
);

export default PauseButton;
