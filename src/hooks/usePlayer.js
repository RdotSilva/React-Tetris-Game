import { useState, useCallback } from "react";

import { TETROMINOES, randomTetromino } from "../utils/tetrominoes";

import { STAGE_WIDTH } from "./../utils/gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOES[0].shape,
    collided: false
  });

  const rotate = (tetromino, dir) => {
    // Transpose rows to columns
    const rotatedTetromino = tetromino.map((_, index) =>
      tetromino.map(col => col[index])
    );
    // Reverse each row to get rotated tetromino
    if (dir > 0) return rotatedTetromino.map(row => row.reverse());
    return rotatedTetromino.reverse();
  };

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));

    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer];
};
