import { useState } from "react";
import { createStage } from "../utils/gameHelpers";

export const useStage = () => {
  const [stage, setStage] = useStage(createStage());

  return [stage, setStage];
};
