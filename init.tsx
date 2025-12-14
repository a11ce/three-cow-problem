import { createLog } from "@roc/core/log";
import { createInputHandler } from "@roc/core/input";
import { createRoomController } from "@roc/core/room";
import { createLayoutController } from "@roc/core/layout";
import { createAvatarController } from "@roc/core/avatar";
import { sideview } from "./layouts";
import { avatarSideview } from "./avatars";
import { createTaskController } from "@roc/core/task";
import { createColorController } from "@roc/core/colors";
import { createAudioController } from "@roc/core/audio";
//import { createInventory } from "./inventory";
import { camp } from "./rooms/camp";
import type { CowCtx } from "./game";

export function initializeThreeCow(): CowCtx {
  const log = createLog();
  const input = createInputHandler();
  const layout = createLayoutController();
  const avatar = createAvatarController(avatarSideview);
  const task = createTaskController();
  const color = createColorController();
  const audio = createAudioController();
  log.attachInputHandler(input);

  const curtain = document.createElement("div");
  curtain.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 1;
    pointer-events: none;
    z-index: 67;
  `;
  document.body.appendChild(curtain);
  curtain.offsetHeight;
  curtain.style.transition = "opacity 2s ease-in-out";

  const fadeOut = (): Promise<void> => {
    return new Promise((resolve) => {
      curtain.style.opacity = "1";
      setTimeout(resolve, 2000);
    });
  };

  const fadeIn = (): Promise<void> => {
    return new Promise((resolve) => {
      curtain.style.opacity = "0";
      setTimeout(resolve, 2000);
    });
  };

  const ctx = {} as CowCtx;

  ctx.gameName = "threeCow";

  ctx.log = log;
  ctx.input = input;
  ctx.layout = layout;
  ctx.avatar = avatar;
  ctx.task = task;
  ctx.color = color;
  ctx.audio = audio;
  ctx.room = createRoomController(ctx);

  ctx.bessieState = "alive";
  ctx.nessieState = "alive";
  ctx.tessieState = "alive";
  ctx.currentNight = 0;

  ctx.fadeOut = fadeOut;
  ctx.fadeIn = fadeIn;

  ctx.audio.init(ctx);

  ctx.layout.set(sideview);

  ctx.room.goTo(camp);

  return ctx;
}
