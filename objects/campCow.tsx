import { type GameObject } from "@roc/core/gameObject";
import { Sprite } from "@roc/core/sprite";
import type { CowCtx, CowState } from "../game";

export function createCampCow(x: number, state: CowState): GameObject<CowCtx> {
  const getAssetPaths = () => ["/assets/cow.png", "/assets/cross.png"];

  const getX = () => x;

  const getSprite = (_ctx: CowCtx) => {
    switch (state) {
      case "alive":
        return Sprite.fromFile("/assets/cow.png", 0.3).flip();
      case "dead":
        return Sprite.fromFile("/assets/cross.png", 0.3);
    }
  };

  return {
    getAssetPaths,
    getX,
    getSprite,
  };
}
