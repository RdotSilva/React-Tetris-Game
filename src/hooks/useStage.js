import { useState, useEffect } from "react";
import { createStage } from "../utils/gameHelpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    // Clear stage
    const updateStage = prevStage => {
      const newStage = prevStage.map(row =>
        row.map(cell => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      return newStage;
    };

    setStage(prev => updateStage(prev));
  }, [player.collided, player.pos.x, player.pos.y, player.tetromino]);

  return [stage, setStage];
};
