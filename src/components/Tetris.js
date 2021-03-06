import React, { useState } from "react";

import { createStage, checkCollision } from "../utils/gameHelpers";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import PauseButton from "./PauseButton";
import Instructions from "./Instructions";

import { StyledTetrisWrapper } from "./styles/StyledTetris";
import { StyledTetris } from "./styles/StyledTetris";

import { usePlayer } from "./../hooks/usePlayer";
import { useStage } from "./../hooks/useStage";
import { useInterval } from "./../hooks/useInterval";
import { useGameStatus } from "./../hooks/useGameStatus";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(localStorage.getItem("highScore"));

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setGameStarted(true);
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Increase speed
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!");
        setGameStarted(false);
        setGameOver(true);
        if (score > highScore) {
          localStorage.setItem("highScore", score);
          setHighScore(score);
        }
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const instantDrop = () => {
    if (!gamePaused) {
      let rowsUntilCollision = 0;
      while (!checkCollision(player, stage, { x: 0, y: rowsUntilCollision })) {
        rowsUntilCollision += 1;
      }
      updatePlayerPos({ x: 0, y: rowsUntilCollision - 1, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const pauseGame = () => {
    if (!gamePaused) {
      setGamePaused(true);
      setDropTime(null);
    } else {
      setGamePaused(!gamePaused);
      setDropTime(1000 / (level + 1) + 200);
    }
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      } else if (keyCode === 68) {
        instantDrop();
      }
    }
  };

  const disableKeyboard = e => {
    if (!gameOver) {
      e.preventDefault();
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => {
        gamePaused ? disableKeyboard(e) : move(e);
      }}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display
                text={
                  highScore === null
                    ? `High Score: 0`
                    : `High Score: ${highScore}`
                }
              />
              <Display text={`Score: ${score}`} />
              <Display text={`Lines: ${rows}`} />
              <Display text={`Level: ${level}`} />
              <Instructions
                text={"Press the arrow keys to move Press the D key to drop"}
              ></Instructions>
            </div>
          )}
          <StartButton callback={gameStarted ? null : startGame} />
          {!gameStarted ? null : (
            <PauseButton
              callback={pauseGame}
              gamePaused={gamePaused}
              text={gamePaused ? "Unpause Game" : "Pause Game"}
            />
          )}
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
