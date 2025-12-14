import type { CowCtx } from "../game";

const writePlayerDialogueWithoutQuotes = (ctx: CowCtx, text: string) => {
  ctx.log.writeHTML(() => (
    <span style={{ "margin-left": "20px" }}>{text}</span>
  ));
};

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
  async function Jack(ctx: CowCtx) {
    writePlayerDialogueWithoutQuotes(
      ctx,
      '"Okay here we go... Once upon a Time there was a little Cow named Jack who lived with her mom. They were both very poor, and their only possesion was an unnamed old woman. Jack’s mom sent her to the market to sell the old woman, for whatever she could get so that they would have money to pay for their streaming services. At the market she decided to sell the old woman for the price of three magic beans. Now normally that would be an excellent deal, but Jack’s mother had a deadly magical legume allergy.  When Jack got home, her mother threw the beans out the window, and had to go to the ER. When they got back the next morning there was a giant beanstalk in their yard where Mrs.Jack threw the beans. Jack had a penchant for climbing due to probably goat ancestry, and immediately climbed to the very top. At the top of the Beanstalk lived a sky-whale who ate cows (can you imagine?). The sky-whale had a massive high yield savings account left to her by her exceedingly rich sky-parents, and would use the funds to pay off the police and media so she could swoop down from the sky in the dead of night to steal calves to feed her cow eating habit. All in all she was very bad. Jack, being in on this open secret, felt it completely justified to steal the login info for said savings account from the little sticky note the sky-whale left on her computer monitor. In a few short weeks Jack and her mother were living in a Luxembourg mansion with their newfound wealth, where they lived happily ever after. The end."',
    );
    ctx.log.write(
      '"That story always makes me feel so happy... We should rob the bank."',
    );
    await buttonHelperMoreChoices(
      ctx,
      'Oh my God..."',
      '"not you too..."',
      '"Fried flapjacks on rainy morning, what’s gotten into you guys?',
    );
    ctx.log.write('"What? It’s an inspirational tale!"');
    if (
      await buttonHelper(
        ctx,
        '"NO. No more crimes. No bank robbery."',
        '"Ugh. You’re not wrong."',
      )
    ) {
      return await out_(ctx);
    } else {
      return await in_(ctx);
    }
  }

  async function goldicow(ctx: CowCtx) {
    ctx.log.write('"You know that song makes me scared to cross bridges."');
    if (
      await buttonHelper(
        ctx,
        '"How about Goldicow and the three additional cows?"',
        '"How about Jack (who is a cow) and the Beanstalk. (a-gosh-ding-dang-gain)"',
      )
    ) {
      return await redriding(ctx);
    } else {
      return await yesjack(ctx);
    }
  }

  async function guess(ctx: CowCtx) {
    ctx.log.write('"No... Can I get a bedtime story?"');
    return await story(ctx);
  }

  async function in_(ctx: CowCtx) {
    ctx.log.write('"Yay! I’ll meet you here at first light. Bring GUNS."');
  }

  async function laststory(ctx: CowCtx) {
    ctx.log.write('"Nein! Meine kleinen Hoofen Thumben..."');
    await buttonHelper(
      ctx,
      '"How about Jack (who is a cow) and the Beanstalk. (a-gosh-ding-dang-gain)"',
    );
    return await yesjack(ctx);
  }

  async function need(ctx: CowCtx) {
    ctx.log.write('"Maaaaybeeee."');
    return await need2(ctx);
  }

  async function need2(ctx: CowCtx) {
    if (
      await buttonHelper(
        ctx,
        '"Do you need me to guess what you need?"',
        '"What can I do ya for?"',
      )
    ) {
      return await guess(ctx);
    } else {
      return await whatdo(ctx);
    }
  }

  async function nicenight(ctx: CowCtx) {
    ctx.log.write(
      '"No it’s not. It’s boring and it’s also dusty. The worst way for a night to be."',
    );
    if (
      await buttonHelper(
        ctx,
        '"It’s not all that bad."',
        '"You’re right it does kinda suck"',
      )
    ) {
      return await notbad(ctx);
    } else {
      return await sucks(ctx);
    }
  }

  async function notbad(ctx: CowCtx) {
    ctx.log.write('"It IS."');
    return await need2(ctx);
  }

  async function out_(ctx: CowCtx) {
    ctx.log.write('"YOU’RE NOT MY REAL DAD!"');
  }

  async function redriding(ctx: CowCtx) {
    ctx.log.write(
      '"That one spreads the harmful stereotype that all cows eat nothing but Cow Porridge."',
    );
    if (
      await buttonHelper(
        ctx,
        '"How about Little Red Riding Cow?"',
        '"How about Jack (who is a cow) and the Beanstalk. (a-gosh-ding-dang-gain)"',
      )
    ) {
      return await sciss(ctx);
    } else {
      return await yesjack(ctx);
    }
  }

  async function sciss(ctx: CowCtx) {
    ctx.log.write(
      '"You KNOW me and my Grandma aren’t on good terms right now."',
    );
    if (
      await buttonHelper(
        ctx,
        '"How about Die Geschichte vom Daumenlutscher."',
        '"How about Jack (who is a cow) and the Beanstalk. (a-gosh-ding-dang-gain)"',
      )
    ) {
      return await laststory(ctx);
    } else {
      return await yesjack(ctx);
    }
  }

  async function start(ctx: CowCtx) {
    await buttonHelper(ctx, '"Hey there, Nessie."');
    ctx.log.write('"Hiiii."');
    if (
      await buttonHelper(
        ctx,
        '"Sure is a nice night."',
        '"I’m guessing you need something too?"',
      )
    ) {
      return await nicenight(ctx);
    } else {
      return await need(ctx);
    }
  }

  async function story(ctx: CowCtx) {
    if (
      await buttonHelper(
        ctx,
        '"How about the story of the Three BillyCows Gruff?"',
        '"How about Jack (who is a cow) and the Beanstalk. (a-gosh-ding-dang-gain)"',
      )
    ) {
      return await goldicow(ctx);
    } else {
      return await yesjack(ctx);
    }
  }

  async function sucks(ctx: CowCtx) {
    ctx.log.write('"Right? Dust is the most boring type of particle!"');
    return await need2(ctx);
  }

  async function whatdo(ctx: CowCtx) {
    ctx.log.write('"Will you tell me a bedtime story? Pweeeeze?"');
    return await story(ctx);
  }

  async function yesjack(ctx: CowCtx) {
    ctx.log.write('"Finally. Yes please"');
    await ctx.log.showButtons("Tell story.");
    return await Jack(ctx);
  }

  return start;
}
