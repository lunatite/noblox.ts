import { AuthUser } from "../users/authUser";
import { GroupRole } from "./groupRole";
export interface GroupMembershipResponse {
    groupId: number;
    isPrimary: boolean;
    isPendingJoin: boolean;
    userRole: {
        user: AuthUser;
        role: GroupRole;
    };
    permissions: {
        groupPostsPermission: {
            viewWall: boolean;
            postToWall: boolean;
            deleteFromWall: boolean;
            viewStatus: boolean;
            postToStatus: boolean;
        };
        groupMembershipPermissions: {
            changeRank: boolean;
            inviteMembers: boolean;
            removeMembers: boolean;
        };
        groupManagementPermissions: {
            manageRelationships: boolean;
            manageClan: boolean;
            viewAuditLogs: boolean;
        };
        groupEconomyPermissions: {
            spendGroupFunds: boolean;
            advertiseGroup: boolean;
            createItems: boolean;
            manageItems: boolean;
            addGroupPlaces: boolean;
            manageGroupGames: boolean;
            viewGroupPayouts: boolean;
            viewAnalytics: boolean;
        };
        groupOpenCloudPermissions: {
            useCloudAuthentication: boolean;
            administerCloudAuthentication: boolean;
        };
    };
}
