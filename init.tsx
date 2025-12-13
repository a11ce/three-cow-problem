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

  ctx.audio.init(ctx);

  ctx.layout.set(sideview);

  ctx.room.goTo(camp);

  return ctx;
}
