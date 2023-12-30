export interface UploadedAsset {
    assetId: string;
    displayName: string;
    moderationResult: {
        moderationState: string;
    };
}
