import { RobloxSession } from "../../robloxSession";
import { GroupMembershipResponse, GroupResponse, GroupAnalyticTimePeriod, GroupRevenueSummayResponse } from "../../entities/groups";
import { GroupSearch } from "./groupSearch";
import { GroupSearchResponse } from "../../entities/groups/groupSearchResponse";
export declare class GroupsService {
    private readonly _session;
    static readonly baseUrl = "https://groups.roblox.com/v1/groups";
    constructor(_session: RobloxSession);
    getGroupFunds(groupId: number): Promise<number>;
    getGroup(groupId: number): Promise<GroupResponse>;
    getUserGroupMembership(groupId: number): Promise<GroupMembershipResponse>;
    getGroupRevenueSummary(groupId: number, timePeriod: GroupAnalyticTimePeriod): Promise<GroupRevenueSummayResponse>;
    sendAllyRequest(userGroupId: number, targetGroupId: number): Promise<void>;
    static searchGroup(groupSearch: GroupSearch): Promise<GroupSearchResponse>;
}
