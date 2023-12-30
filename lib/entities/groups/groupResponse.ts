import { GroupOwner } from "./groupOwner";

export interface GroupResponse {
  id: number;
  name: string;
  description: string | null;
  owner: GroupOwner | null;
  memberCount: number;
  isBuildersClubOnly: boolean;
  publicEntryAllowed: boolean;
  hasVerifiedBadge: boolean;
}
