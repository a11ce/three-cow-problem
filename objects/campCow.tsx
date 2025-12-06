import { type GameObject } from "@roc/core/gameObject";
import { Sprite } from "@roc/core/sprite";
import type { CowCtx, CowState } from "../game";

export function createCampCow(x: number, state: CowState): GameObject<CowCtx> {
  const getAssetPaths = () => ["cow.png", "cross.png"];

  const getX = () => x;

  const getSprite = (_ctx: CowCtx) => {
    switch (state) {
      case "alive":
        return Sprite.fromFile("cow.png", 0.3).flip();
      case "dead":
        return Sprite.fromFile("cross.png", 0.3);
    }
  };

  return {
    getAssetPaths,
    getX,
    getSprite,
  };
}
