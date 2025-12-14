import { vSplit, hSplit } from "@roc/core/layout";
import SideviewRoom from "@roc/components/SideviewRoom";
import Debug from "@roc/components/Debug";
import LogDisplay from "@roc/components/LogDisplay";
import Slop from "./components/Slop";

export const sideview = vSplit(
  25,
  SideviewRoom,
  hSplit(25, Debug, hSplit(50, LogDisplay, Slop)),
);
