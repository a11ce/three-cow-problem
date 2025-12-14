import { type GameObject } from "@roc/core/gameObject";
import { Sprite } from "@roc/core/sprite";
import type { CowCtx } from "../game";
import { camp } from "../rooms/camp";

export function createBed(x: number): GameObject<CowCtx> {
  const getAssetPaths = () => [];
  const getX = () => x;
  const getSprite = (_ctx: CowCtx) => Sprite.circle(20, "bed");

  const onInteract = async (ctx: CowCtx) => {
    if (!ctx.conversationOver) {
      if (ctx.currentNight === 0) {
        ctx.log.write("Tessie can't sleep, go talk to her.");
      } else if (ctx.currentNight === 1) {
        ctx.log.write("Nessie can't sleep, go talk to her.");
      }
    } else {
      ctx.log.write("Go to sleep?");
      if ((await ctx.log.showButtons("yes", "no")) == "yes") {
        await ctx.fadeOut();
        ctx.currentNight++;
        ctx.room.goTo(camp);
      }
    }
  };

  return {
    getAssetPaths,
    getX,
    getSprite,
    onInteract,
  };
}
