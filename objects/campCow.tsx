import { type GameObject } from "@roc/core/gameObject";
import { Sprite } from "@roc/core/sprite";
import type { CowCtx, CowState } from "../game";

export function createCampCow(
  startX: number,
  state: CowState,
): GameObject<CowCtx> {
  const getAssetPaths = () => ["cow.png", "cross.png"];
  const xAfterMoving = 600;
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
        x -= speed;
        return x <= xAfterMoving;
      });
      isMovingRight = false;
    }
  };
    const onEnterInteractRange = async (ctx: CowCtx) => {
        if (ctx.currentNight == 0) {
            ctx.log.write("\"Talk to Tessie!\"")
            if ((await ctx.log.showButtons("Hey there, Tessie.")) === "Hey there, Tessie.") {
                ctx.log.write("\"Hey there, Tessie.\"")
                ctx.log.write("\"Hey there, Cow Poke\"")
                if ((await ctx.log.showButtons("Here for some before bed S'mores?", "Can't sleep again, huh?")) === "Here for some before bed S'mores?") {
                    ctx.log.write("\"Here for some before bed S'mores?\"")
                    ctx.log.write("\"Noooo.\"")
                    if ((await ctx.log.showButtons("Here for a campfire sing-along?", "Can't sleep again, huh?")) === "Here for a campfire sing-along?") {
                        ctx.log.write("\"Here for a campfire sing-along?\"")
                        ctx.log.write("\"Not exactlyyy.\"")
                        if ((await ctx.log.showButtons("Here for a shiatzu massage?", "Can't sleep again, huh?")) === "Here for a shiatzu massage?") {
                            ctx.log.write("\"Here for a shiatzu massage?\"")
                            ctx.log.write("\"Noooooooo.\"")
                            if ((await ctx.log.showButtons("Here to give me a shiatzu massage?", "Can't sleep again, huh?")) === "Here to give me a shiatzu massage?") {
                                ctx.log.write("\"Here to give me a shiatzu massage?\"")
                                ctx.log.write("\"NOOooo!\"")
                            }
                                if ((await ctx.log.showButtons("Can't sleep again, huh?")) === "Can't sleep again, huh?") {
                            }
                        }
                    }
                }
                ctx.log.write("\"Can't sleep again, huh?\"")
                ctx.log.write("\"....yeahh. Would you sing me a lullaby?\"")
                if ((await ctx.log.showButtons("Of course. Get cozy.")) === "Of course. Get cozy.") {
                    ctx.log.write("\"Of course. Get cozy.\"")

                }
                
            }
        }
    }
  return {
    getAssetPaths,
    getX,
    getSprite,
      onEnterRoom,
    onEnterInteractRange
  };
}
