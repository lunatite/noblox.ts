import axios from "axios";
import { RobloxSession } from "../../robloxSession";
import {
  GroupMembershipResponse,
  GroupResponse,
  GroupAnalyticTimePeriod,
  GroupRevenueSummayResponse,
} from "../../entities/groups";
import { GroupSearch } from "./groupSearch";
import { GroupSearchResponse } from "../../entities/groups/groupSearchResponse";

export class GroupsService {
  public static readonly baseUrl = "https://groups.roblox.com/v1/groups";

  constructor(private readonly _session: RobloxSession) {}

  public async getGroupFunds(groupId: number) {
    const response = await this._session.request<{ robux: number }>(
      `${GroupsService.baseUrl}/${groupId}/currency`,
      "GET",
    );
    return response.data.robux;
  }

  public async getGroup(groupId: number): Promise<GroupResponse> {
    const resp = await this._session.request<GroupResponse>(
      `${GroupsService.baseUrl}/${groupId}`,
      "GET",
    );
    return resp.data;
  }

  public async getUserGroupMembership(groupId: number) {
    const response = await this._session.request<GroupMembershipResponse>(
      `${GroupsService.baseUrl}/${groupId}/membership`,
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

  public async sendAllyRequest(userGroupId: number, targetGroupId: number) {
    await this._session.request(
      `${GroupsService.baseUrl}/${userGroupId}/relationships/allies/${targetGroupId}`,
      "POST",
    );
  }

  public static async searchGroup(groupSearch: GroupSearch) {
    const response = await axios.get<GroupSearchResponse>(
      `${GroupsService.baseUrl}/search`,
      {
        params: groupSearch.params,
      },
    );

    return response.data;
  }
}
