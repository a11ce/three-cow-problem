import { getGameCtx, type GameCtx } from "@roc/core/game";

export type CowState = "alive" | "dead";

export interface CowCtx extends GameCtx {
  bessieState: CowState;
  nessieState: CowState;
  tessieState: CowState;
  currentNight: number;
  conversationOver: boolean;
  fadeOut(): Promise<void>;
  fadeIn(): Promise<void>;
  getSlop(): string;
  setSlop(id: string): void;
}

export const getCowCtx = () => getGameCtx() as CowCtx;
