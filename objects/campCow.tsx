import { type GameObject } from "@roc/core/gameObject";
import { Sprite } from "@roc/core/sprite";
import type { CowCtx, CowState } from "../game";

export function createCampCow(startX: number, state: CowState): GameObject<CowCtx> {
  const getAssetPaths = () => ["cow.png", "cross.png"];
    const xAfterMoving = 1000;
    const speed = 2.5;
    let x = startX;
    let isMovingRight = false;
    let hasMoved = false;
  const getX = () => x;

  const getSprite = (_ctx: CowCtx) => {
    switch (state) {
      case "alive":
        return Sprite.fromFile("cow.png", 0.3).flip();
      case "dead":
        return Sprite.fromFile("cross.png", 0.3);
      }
 
  };

    const onEnterRoom = async (ctx: CowCtx) => {
        console.log("room entered");
        if (!hasMoved) {
            hasMoved = true;
            isMovingRight = false;
            await ctx.task.runTask(() => {
                x += speed;
                return x <= xAfterMoving;
            });
            isMovingRight = false;
            
        }
    }

  return {
    getAssetPaths,
    getX,
    getSprite,
  };
}
