export interface MultiGetByNameResponse {
    requestedUsername: string;
    hasVerifiedBadge: boolean;
    id: number;
    name: string;
    displayName: string;
}
export interface MultiGetUserByNameArrayResponse {
    data: MultiGetByNameResponse[];
}
