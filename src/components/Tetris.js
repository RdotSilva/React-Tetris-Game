import React from "react";
import { createStage } from "./../utils/gameHelpers";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import { StyledTetrisWrapper } from "./styles/StyledTetris";
import { StyledTetris } from "./styles/StyledTetris";

const Tetris = () => {
  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Stage stage={createStage()} />
        <aside>
          <div>
            <Display text="Score" />
            <Display text="Rows" />
            <Display text="Level" />
          </div>
          <StartButton />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
