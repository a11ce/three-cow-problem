import { createAvatarSideview } from "@roc/objects/avatarSideview";
import { Sprite } from "@roc/core/sprite";

export const avatarSideview = {
  ...createAvatarSideview(),
  getAssetPaths: () => ["cowboy.png"],
  getSprite: () => Sprite.fromFile("cowboy.png", 0.2),
};
