import { vSplit, hSplit } from "@roc/core/layout";
import SideviewRoom from "@roc/components/SideviewRoom";
import Debug from "@roc/components/Debug";
import LogDisplay from "@roc/components/LogDisplay";

export const sideview = vSplit(25, SideviewRoom, hSplit(25, Debug, LogDisplay));
