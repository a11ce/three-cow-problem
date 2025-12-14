import type { CowCtx } from "../game";
import { createResetRoom } from "@roc/core/room";
import { createCampCow } from "../objects/campCow";
import { createBed } from "../objects/bed";
import { createCampfire } from "../objects/campfire";
import { avatarSideview } from "../avatars";

//const bessie = createCampCow(600, ctx.bessieState);
//const nessie = createCampCow(800, ctx.nessieState);

export const camp = createResetRoom<CowCtx>((ctx) => {
  //console.log(ctx);
  const onEnter = async (ctx: CowCtx) => {
    if (ctx.currentNight == 3) {
      return;
    }

    ctx.avatar.set(avatarSideview);
    ctx.conversationOver = false;
    ctx.log.clear();
    if (ctx.currentNight == 0) {
      ctx.setSlop("eRXE8Aebp7s");
      ctx.log.write(
        `The three most prized cattle of Slickhand Ranch's very own Big Rustlin' Pedro De Las Vacas, each having won Best in Class at this year's Rootinest Tootinest Cow Exhibition are traveling with you, their designated protector, a Cow-Boy. Each of the claims to the various Rootin Tootin titles they held were bona fide, but their personalities were nothing short of difficult. It's been a long fortnight on the dusty trail and the small town of Cactus Sands Ravine can be seen peeking over the horizon. After setting up camp and eating your nightly dinner of Beans and S'mores you're just about ready for bed.`,
      );
    } else if (ctx.currentNight == 1) {
      ctx.setSlop("Z5DcTdVqqTI");
      ctx.log.write(
        `It's been a long fortnight and one day on the dusty trail.  The smell of burning wood permeates the air, and smoke clouds the  gibbous moon. The small town of Free Coyote Point can be seen peeking over the horizon.  After setting up camp and eating your nightly dinner of Beans and Popcorn you're just about ready for bed.`,
      );
    } else if (ctx.currentNight == 2) {
      ctx.setSlop("orD6yIilR0A");
      ctx.log.write(
        "It's been a long fortnight and two days on the dusty trail. As you set up camp you finally see lights and smoke rising from just beyond the horizon. By tomorrow at noon you'll finally be in Mesa Springs Valley to collect your payment, and, more importantly, free yourself from your three irksome charges. It was time for one last set of nightly tasks and rituals and then freedom.",
      );
    }
    await ctx.fadeIn();
  };
  const tessie = createCampCow(1400, ctx.tessieState);

  const bed = createBed(50);
  const campfire = createCampfire(320);

  return {
    avatarPosition: { x: 200, y: 0 },
    objects: [tessie, bed, campfire],
    onEnter,
    sideviewGfx: { width: 700, scrollDeadzone: 50 },
  };
});
