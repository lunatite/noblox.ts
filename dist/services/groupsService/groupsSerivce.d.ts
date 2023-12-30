import { RobloxSession } from "../../robloxSession";
import { GroupMembershipResponse } from "../../entities/groups/groupMembershipResponse";
import { GroupResponse } from "../../entities/groups/groupResponse";
import { GroupAnalyticTimePeriod } from "../../entities/groups/groupAnalyticTimePeriod";
import { GroupRevenueSummayResponse } from "../../entities/groups/groupRevenueSummaryResponse";
export declare class GroupsService {
    private readonly _session;
    constructor(_session: RobloxSession);
    getGroupFunds(groupId: number): Promise<number>;
    getGroup(groupId: number): Promise<GroupResponse>;
    getUserGroupMembership(groupId: number): Promise<GroupMembershipResponse>;
    getGroupRevenueSummary(groupId: number, timePeriod: GroupAnalyticTimePeriod): Promise<GroupRevenueSummayResponse>;
}
