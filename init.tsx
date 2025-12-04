import { createLog } from "@roc/core/log";
import { createInputHandler } from "@roc/core/input";
import { createRoomController } from "@roc/core/room";
import { createLayoutController } from "@roc/core/layout";
import { createAvatarController } from "@roc/core/avatar";
import { sideview } from "./layouts";
import { avatarSideview } from "./avatars";
import { camp } from "./rooms/camp";
import type { CowCtx } from "./game";

export function initializeThreeCow(): CowCtx {
  const log = createLog();
  const input = createInputHandler();
  const layout = createLayoutController();
  const avatar = createAvatarController(avatarSideview);
  log.attachInputHandler(input);

  const ctx = {} as CowCtx;

  ctx.log = log;
  ctx.input = input;
  ctx.layout = layout;
  ctx.avatar = avatar;
  ctx.room = createRoomController(ctx);

  ctx.bessieState = "alive";
  ctx.nessieState = "alive";
  ctx.tessieState = "alive";
  ctx.currentNight = 0;

  ctx.layout.set(sideview);

  ctx.room.goTo(camp);

  return ctx;
}
