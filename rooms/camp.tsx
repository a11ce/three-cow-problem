import type { CowCtx } from "../game";
import { createResetRoom } from "@roc/core/room";
import { createCampCow } from "../objects/campCow";

export const camp = createResetRoom<CowCtx>((ctx) => {
  const onEnter = (ctx: CowCtx) => {
    ctx.log.write(`It is day ${ctx.currentNight}`);
  };

  const bessie = createCampCow(600, ctx.bessieState);
  const nessie = createCampCow(800, "dead");
  const tessie = createCampCow(1000, ctx.tessieState);

  return {
    avatarPosition: { x: 100, y: 0 },
    objects: [bessie, nessie, tessie],
    onEnter,
  };
});
