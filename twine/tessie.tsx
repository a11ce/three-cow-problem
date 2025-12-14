import type { CowCtx } from "../game";

export default function createTwineDialogue(
  buttonHelper: (
    ctx: CowCtx,
    option1: string,
    option2?: string,
  ) => Promise<boolean>,
  buttonHelperMoreChoices: (
    ctx: CowCtx,
    ...options: string[]
  ) => Promise<number>,
) {
  async function In(ctx: CowCtx) {
    ctx.log.write(
      "\"Yay! Let's hit the hay. We've got a big day ahead of us.\"",
    );
    ctx.log.write('"Goodnight, Tessie."');
  }

  async function Out(ctx: CowCtx) {
    ctx.log.write("\"Fine! I'll do it myself. Then you'll see!\"");
  }

  async function crazy(ctx: CowCtx) {
    ctx.log.write(
      '"No it\'s not! think about it. small fire. relaxing. Big fire. SOOO COZY."',
    );
    return await so(ctx);
  }

  async function genius(ctx: CowCtx) {
    ctx.log.write('"Thank you. I know"');
    return await so(ctx);
  }

  async function letsburn(ctx: CowCtx) {
    ctx.log.write(
      '"That was nice. The fire is so relaxing.... We should burn down the saloon tomorrow."',
    );
    await buttonHelperMoreChoices(
      ctx,
      '...Wait what?"',
      '"Excuse me?"',
      "\"What in tarnation'?",
    );
    ctx.log.write(
      '"This fire is so nice. I just think a bigger one would be even nicer."',
    );
    if (
      await buttonHelper(
        ctx,
        "That's the craziest thing I've ever heard",
        "Tessie, You're a genius.",
      )
    ) {
      return await crazy(ctx);
    } else {
      return await genius(ctx);
    }
  }

  async function so(ctx: CowCtx) {
    ctx.log.write('"Soooooo?"');
    if (await buttonHelper(ctx, "So what?", '"I\'m in."')) {
      return await sowhat(ctx);
    } else {
      return await In(ctx);
    }
  }

  async function sowhat(ctx: CowCtx) {
    ctx.log.write('"So are you gonna do it? For li\'l ol mee?"');
    if (
      await buttonHelper(
        ctx,
        '"No. Tessie? look at me. No."',
        '"Fine, if it will get you to to sleep"',
      )
    ) {
      return await Out(ctx);
    } else {
      return await In(ctx);
    }
  }

  return letsburn;
}
