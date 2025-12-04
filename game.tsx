import { getGameCtx, type GameCtx } from "@roc/core/game";

export type CowState = "alive" | "dead";

export interface CowCtx extends GameCtx {
  bessieState: CowState;
  nessieState: CowState;
  tessieState: CowState;
  currentNight: number;
}

export const getCowCtx = () => getGameCtx() as CowCtx;
