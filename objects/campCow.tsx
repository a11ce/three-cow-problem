import { type GameObject } from "@roc/core/gameObject";
import { Sprite } from "@roc/core/sprite";
import type { CowCtx, CowState } from "../game";
import createTwineDialogue from "../twine/tessie";
import createNessieTwineDialogue from "../twine/nessie";
import createBessieTwineDialogue from "../twine/bessie";

export function createCampCow(
  startX: number,
  state: CowState,
): GameObject<CowCtx> {
  const getAssetPaths = () => [
    "bessie.png",
    "nessie.png",
    "tessie.png",
    "cow.png",
  ];
  const xAfterMoving = 600;
  const speed = 2.5;
  let x = startX;
  let isMovingRight = false;
  let hasMoved = false;
  const getX = () => x;

  const writePlayerDialogue = (ctx: CowCtx, text: string) => {
    ctx.log.writeHTML(() => (
      <span style={{ "margin-left": "20px" }}>"{text}"</span>
    ));
  };

  const buttonHelper = async (
    ctx: CowCtx,
    option1: string,
    option2: string = "",
  ) => {
    var equalsoption1 = true;
    if (option2 == "") {
      await ctx.log.showButtons(option1);
    } else {
      equalsoption1 = (await ctx.log.showButtons(option1, option2)) == option1;
    }
    const chosenText = equalsoption1 ? option1 : option2;
    writePlayerDialogue(ctx, chosenText);
    return equalsoption1;
  };

  const buttonHelperMoreChoices = async (
    ctx: CowCtx,
    ...options: string[]
  ): Promise<number> => {
    const chosen = await ctx.log.showButtons(...options);
    const index = options.indexOf(chosen);
    writePlayerDialogue(ctx, chosen);
    return index;
  };

  const tessieTwine = createTwineDialogue(
    buttonHelper,
    buttonHelperMoreChoices,
  );

  const nessieTwine = createNessieTwineDialogue(
    buttonHelper,
    buttonHelperMoreChoices,
  );

  const bessieTwine = createBessieTwineDialogue(
    buttonHelper,
    buttonHelperMoreChoices,
  );

  const getSprite = (ctx: CowCtx) => {
    if (ctx.currentNight === 0) {
      return Sprite.fromFile("tessie.png", 0.3);
    } else if (ctx.currentNight === 1) {
      return Sprite.fromFile("nessie.png", 0.3);
    } else if (ctx.currentNight === 2) {
      return Sprite.fromFile("bessie.png", 0.3);
    }

    return Sprite.fromFile("cow.png", 0.3).flip();
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

  async function tess0(ctx: CowCtx) {
    await buttonHelper(ctx, "Hey there,Tessie.");
    ctx.log.write('"Hey there, Cow Poke"');
    if (
      await buttonHelper(
        ctx,
        "Here for some before bed S'mores?",
        "Can't sleep again, huh?",
      )
    ) {
      return await tess1(ctx);
    } else {
      return await tess4(ctx);
    }
  }

  async function tess1(ctx: CowCtx) {
    ctx.log.write('"Noooo."');
    if (
      await buttonHelper(
        ctx,
        "Here for a campfire sing-along?",
        "Can't sleep again, huh?",
      )
    ) {
      return await tess2(ctx);
    } else {
      return await tess4(ctx);
    }
  }

  async function tess2(ctx: CowCtx) {
    ctx.log.write('"Not exactlyyy."');
    if (
      await buttonHelper(
        ctx,
        "Here for a shiatzu massage?",
        "Can't sleep again, huh?",
      )
    ) {
      return await tess3(ctx);
    } else {
      return await tess4(ctx);
    }
  }

  async function tess3(ctx: CowCtx) {
    ctx.log.write('"Noooooooo."');
    if (
      await buttonHelper(
        ctx,
        "Here to give me a shiatzu massage?",
        "Can't sleep again, huh?",
      )
    ) {
      ctx.log.write('"NOOooo!"');
      await buttonHelper(ctx, "Can't sleep again, huh?");
    }
    return await tess4(ctx);
  }

  async function tess4(ctx: CowCtx) {
    ctx.log.write('"....yeahh. Would you sing me a lullaby?"');
    await buttonHelper(ctx, "Of course. Get cozy.");
    await buttonHelper(ctx, "It's nighttime in the desert-");
    if (
      await buttonHelper(
        ctx,
        "and the wind is dying down",
        "and sand is fast asleep",
      )
    ) {
      return await tess5(ctx);
    } else {
      ctx.log.write('"oh no it\'s another weird one"');
      return await tess6(ctx);
    }
  }

  async function tess5(ctx: CowCtx) {
    ctx.log.write('"All the boys are in their bedrolls and the cows are"');
    if (await buttonHelper(ctx, "soft and brown", "wearing gowns")) {
      return await tess7(ctx);
    } else {
      ctx.log.write('"What?"');
      return await tess7(ctx);
    }
  }

  async function tess6(ctx: CowCtx) {
    ctx.log.write('"All the boys are in their bedrolls and the cows are"');
    await buttonHelper(ctx, "with the sheep", "in a heap");
    return await tess7(ctx);
  }

  async function tess7(ctx: CowCtx) {
    ctx.log.write("The moon is shining bright above. The stars are-");
    if (await buttonHelper(ctx, "shining too", "its little friends")) {
      return await tess8(ctx);
    } else {
      ctx.log.write('"That\'s cute"');
      return await tess9(ctx);
    }
  }

  async function tess8(ctx: CowCtx) {
    ctx.log.write('"And soon the aforementioned cows and boys"');
    if (await buttonHelper(ctx, "will take a snooze", "will eat some stew")) {
      return await tess10(ctx);
    } else {
      ctx.log.write('"But we just had s\'mores"');
      return await tess10(ctx);
    }
  }

  async function tess9(ctx: CowCtx) {
    ctx.log.write('"And soon the aforementioned cows and boys"');
    if (await buttonHelper(ctx, "to dreamland wend", "all catch the bends")) {
      return await tess10(ctx);
    } else {
      ctx.log.write('"Like what divers get?"');
      return await tess10(ctx);
    }
  }

  async function tess10(ctx: CowCtx) {
    ctx.log.write('"So rest easy, lay your head down, and"');
    if (
      await buttonHelper(
        ctx,
        "just gently close your eyes",
        "sail off to Dream Isle",
      )
    ) {
      return await tess11(ctx);
    } else {
      ctx.log.write('"Ooooh nautical"');
      return await tess12(ctx);
    }
  }

  async function tess11(ctx: CowCtx) {
    ctx.log.write("'Cause soon the day will start again");
    if (
      await buttonHelper(
        ctx,
        "the big ol sun will rise",
        "the old day will have died",
      )
    ) {
      return await tess13(ctx);
    } else {
      ctx.log.write('"Why so morbid?"');
      return await tess13(ctx);
    }
  }

  async function tess12(ctx: CowCtx) {
    ctx.log.write("'Cause soon the day will start again");
    if (
      await buttonHelper(
        ctx,
        "sleep tight for just a while",
        "time flows on like the nile",
      )
    ) {
      return await tess13(ctx);
    } else {
      ctx.log.write('"Kinda pretentious IMO, but okay."');
      return await tess13(ctx);
    }
  }

  async function tess13(ctx: CowCtx) {
    return await tessieTwine(ctx);
  }

  const onEnterInteractRange = async (ctx: CowCtx) => {
    if (ctx.currentNight == 0) {
      await tess0(ctx);
    } else if (ctx.currentNight == 1) {
      await nessieTwine(ctx);
    } else if (ctx.currentNight == 2) {
      await bessieTwine(ctx);
    }
    ctx.conversationOver = true;
    await ctx.task.runTask(() => {
      x += speed;
    });
  };
  return {
    getAssetPaths,
    getX,
    getSprite,
    onEnterRoom,
    onEnterInteractRange,
  };
}
