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

    async function  buttonHelper(ctx: CowCtx, option1: string, option2: string = "") {
        var equalsoption1 = true;
        if (option2 == "") {
           await ctx.log.showButtons(option1);
        } else {
            equalsoption1 = await ctx.log.showButtons(option1, option2) == option1;
        }
        if  (equalsoption1){
            ctx.log.write("\""+ option1+ "\"");
        } else {
            ctx.log.write("\""+ option2+ "\"");
        }
        return equalsoption1

    }
    function tess01(ctx:CowCtx) {
        ctx.log.write("Talk to Tessie!")
    }
   async function tess02(ctx: CowCtx) {
       await buttonHelper(ctx, "Hey there,Tessie.");
        ctx.log.write("\"Hey there, Cow Poke\"");
    }
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
            tess01(ctx);
            await tess02(ctx);
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
                    if ((await ctx.log.showButtons("It's nighttime in the desert-")) === "It's nighttime in the desert-") {
                        ctx.log.write("\"It's nighttime in the desert-\"")
                        if ((await ctx.log.showButtons("and the wind is dying down", "and sand is fast asleep")) === "and the wind is dying down") {
                            ctx.log.write("\"and the wind is dying down\"")
                            ctx.log.write("\"All the boys are in their bedrolls and the cows are\"")
                            if ((await ctx.log.showButtons("soft and brown", "wearing gowns")) === "soft and brown") {
                                ctx.log.write("\"soft and brown\"")
                            } else {
                                ctx.log.write("\"wearing gowns\"")
                                ctx.log.write("\"What?\"")
                            }
                        } else {
                            ctx.log.write("\"and the sand is fast asleep.\"")
                            ctx.log.write("\"oh no it's another weird one\"")
                            ctx.log.write("\"All the boys are in their bedrolls and the cows are\"")
                            if ((await ctx.log.showButtons("with the sheep", "in a heap")) === "with the sheep") {
                                ctx.log.write("\"with the sheep\"")
                            } else {
                                ctx.log.write("\"in a heap\"")
                            }
                        }
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
