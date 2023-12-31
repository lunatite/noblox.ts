import { RobloxSession } from "../../robloxSession";
import { GroupMembershipResponse, GroupResponse, GroupAnalyticTimePeriod, GroupRevenueSummayResponse } from "../../entities/groups";
export declare class GroupsService {
    private readonly _session;
    constructor(_session: RobloxSession);
    getGroupFunds(groupId: number): Promise<number>;
    getGroup(groupId: number): Promise<GroupResponse>;
    getUserGroupMembership(groupId: number): Promise<GroupMembershipResponse>;
    getGroupRevenueSummary(groupId: number, timePeriod: GroupAnalyticTimePeriod): Promise<GroupRevenueSummayResponse>;
}
