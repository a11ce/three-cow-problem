import type { CowCtx } from "../game";
import { createResetRoom } from "@roc/core/room";
import { createCampCow } from "../objects/campCow";
import { avatarSideview } from "../avatars";

//const bessie = createCampCow(600, ctx.bessieState);
//const nessie = createCampCow(800, ctx.nessieState);


export const camp = createResetRoom<CowCtx>((ctx) => {
    console.log(ctx);
    const onEnter = (ctx: CowCtx) => {
        ctx.avatar.set(avatarSideview);
        ctx.log.write(`The three most prized cattle of Slickhand Ranch's very own Big Rustlin' Pedro De Las Vacas, each having won Best in Class at this year's Rootinest Tootinest Cow Exhibition are traveling with you, their designated protector, a Cow-Boy. Each of the claims to the various Rootin Tootin titles they held were bona fide, but their personalities were nothing short of difficult. It's been a long fortnight on the dusty trail and the small town of Cactus Sands Ravine can be seen peeking over the horizon. After setting up camp and eating your nightly dinner of Beans and S'mores you're just about ready for bed.`);
  };
    const tessie = createCampCow(1400, ctx.tessieState);
 

  return {
    avatarPosition: { x: 100, y: 0 },
    objects: [tessie],
    onEnter,
  };
});
