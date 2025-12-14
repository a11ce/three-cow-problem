import { type GameObject } from "@roc/core/gameObject";
import { Sprite } from "@roc/core/sprite";
import type { CowCtx } from "../game";

export const createCampfire = (x: number): GameObject<CowCtx> => {
  const getAssetPaths = () => ["campfire.png"];

  const getX = () => x;

  const getSprite = (_ctx: CowCtx) => {
    return Sprite.fromFile("campfire.png", 0.5);
  };

  return {
    getAssetPaths,
    getX,
    getSprite,
  };
};
