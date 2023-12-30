import { RobloxSession } from "../../robloxSession";
import { GroupMembershipResponse } from "../../entities/groups/groupMembershipResponse";
import { GroupResponse } from "../../entities/groups/groupResponse";
import { GroupAnalyticTimePeriod } from "../../entities/groups/groupAnalyticTimePeriod";
import { GroupRevenueSummayResponse } from "../../entities/groups/groupRevenueSummaryResponse";

export class GroupsService {
  constructor(private readonly _session: RobloxSession) {}

  public async getGroupFunds(groupId: number) {
    try {
      const response = await this._session.request<{ robux: number }>(
        `https://economy.roblox.com/v1/groups/${groupId}/currency`,
        "GET",
      );
      return response.data.robux;
    } catch {
      throw new Error("Insufficient permissions.");
    }
  }

  public async getGroup(groupId: number): Promise<GroupResponse> {
    try {
      const resp = await this._session.request<GroupResponse>(
        `https://groups.roblox.com/v1/groups/${groupId}`,
        "GET",
      );
      return resp.data;
    } catch {
      throw new Error("Group does not exist.");
    }
  }

  public async getUserGroupMembership(groupId: number) {
    try {
      const response = await this._session.request<GroupMembershipResponse>(
        `https://groups.roblox.com/v1/groups/${groupId}/membership`,
        "GET",
      );

      return response.data;
    } catch (e) {
      throw new Error(
        "Failed to fetch user group membership. Group moust likely doesn't exist.",
      );
    }
  }

  public async getGroupRevenueSummary(
    groupId: number,
    timePeriod: GroupAnalyticTimePeriod,
  ) {
    try {
      const response = await this._session.request<GroupRevenueSummayResponse>(
        `https://economy.roblox.com/v1/groups/${groupId}/revenue/summary/${timePeriod}`,
        "GET",
      );
      return response.data;
    } catch {
      throw new Error("Failed to fetch group revenue analytics.");
    }
  }
}
