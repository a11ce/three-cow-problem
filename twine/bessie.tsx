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
  async function hello(ctx: CowCtx) {
    ctx.log.write('"What? Why would you say that?"');
    if (
      await buttonHelper(
        ctx,
        '"Sorry, it\'s been a rough week for me."',
        '"I have a hunch is all."',
      )
    ) {
      return await rough(ctx);
    } else {
      return await hunch(ctx);
    }
  }

  async function hunch(ctx: CowCtx) {
    ctx.log.write(
      "\"Typical. You see an innocent award-winning champion cow and you immediately think, 'Oh, she's gonna do crimes. Cows do crimes. Let's talk about all the crime you like to do.' That's you right now. That's what you sound like.\"",
    );
    await buttonHelper(
      ctx,
      "\"You're right. I shouldn't have made assumptions. What's troubling you?\"",
    );
    return await nightmares(ctx);
  }

  async function in_(ctx: CowCtx) {
    ctx.log.write(
      '"Thank you. This will be my first night of real rest in months. Meet me at the town jail at HIGH NOON."',
    );
  }

  async function nightmares(ctx: CowCtx) {
    ctx.log.write(
      "\"I keep having nightmares. It's all these crimes you and my sisters have been doing. They can't go on! They're gonna catch up with us! Everytime I close my eyes I see the hangman's noose.\"",
    );
    if (
      await buttonHelper(
        ctx,
        '"Wow. That\'s heavy."',
        '"Bessie. Look at me. You\'re being paranoid. No one is coming after us"',
      )
    ) {
      return await solution(ctx);
    } else {
      return await proof(ctx);
    }
  }

  async function no(ctx: CowCtx) {
    ctx.log.write('"YES"');
    if (
      await buttonHelper(
        ctx,
        '"NO!"',
        "\"Ugh. I can't believe I'm going along with this\"",
      )
    ) {
      return await no(ctx);
    } else {
      return await in_(ctx);
    }
  }

  async function proof(ctx: CowCtx) {
    ctx.log.write(
      '"I thought you might say that. That\'s why I snagged this poster before we left town."',
    );
    ctx.log.write(
      'She shows you a wanted poster featuring the faces of Tessie, Nessie, Bessie, and yourself. it reads, "WANTED DEAD OR ALIVE Cow Crime Quartet continues crimespree and must be caught."',
    );
    await buttonHelper(ctx, '"Oh no."');
    return await solution(ctx);
  }

  async function rough(ctx: CowCtx) {
    ctx.log.write('"Well I\'ve been having a rough time too."');
    await buttonHelper(ctx, '"Oh? How\'s that?"');
    return await nightmares(ctx);
  }

  async function solution(ctx: CowCtx) {
    ctx.log.write(
      '"But I have a solution! We both want to not be held accountable for our many many crimes, and theres only one person with the power to do that holding."',
    );
    ctx.log.write(
      'OPTIONS("And who\'s that?" | "I do not like where this is heading even one bit." | "Ok, So murder. You\'re gonna suggest murder."',
    );
    ctx.log.write('"The Sheriff. We\'ve gotta take him down."');
    if (
      await buttonHelper(ctx, '"NO."', '"...I guess we\'re killing someone."')
    ) {
      return await no(ctx);
    } else {
      return await in_(ctx);
    }
  }

  async function start(ctx: CowCtx) {
    await buttonHelper(
      ctx,
      '"Hi Bessie. I take it you have a crime you\'d like to commit?"',
    );
    return await hello(ctx);
  }

  return start;
}
