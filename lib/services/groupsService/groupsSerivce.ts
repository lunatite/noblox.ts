import { RobloxSession } from "../../robloxSession";
import {
  GroupMembershipResponse,
  GroupResponse,
  GroupAnalyticTimePeriod,
  GroupRevenueSummayResponse,
} from "../../entities/groups";

export class GroupsService {
  constructor(private readonly _session: RobloxSession) {}

  public async getGroupFunds(groupId: number) {
    const response = await this._session.request<{ robux: number }>(
      `https://economy.roblox.com/v1/groups/${groupId}/currency`,
      "GET",
    );
    return response.data.robux;
  }

  public async getGroup(groupId: number): Promise<GroupResponse> {
    const resp = await this._session.request<GroupResponse>(
      `https://groups.roblox.com/v1/groups/${groupId}`,
      "GET",
    );
    return resp.data;
  }

  public async getUserGroupMembership(groupId: number) {
    const response = await this._session.request<GroupMembershipResponse>(
      `https://groups.roblox.com/v1/groups/${groupId}/membership`,
      "GET",
    );

    return response.data;
  }

  public async getGroupRevenueSummary(
    groupId: number,
    timePeriod: GroupAnalyticTimePeriod,
  ) {
    const response = await this._session.request<GroupRevenueSummayResponse>(
      `https://economy.roblox.com/v1/groups/${groupId}/revenue/summary/${timePeriod}`,
      "GET",
    );
    return response.data;
  }
}
