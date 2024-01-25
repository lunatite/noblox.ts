export interface GetUserResponse {
    description: string;
    created: Date;
    isBanned: boolean;
    externalAppDisplayName: string | null;
    hasVerifiedBadge: boolean;
    id: string;
    name: string;
    displayName: string;
}
