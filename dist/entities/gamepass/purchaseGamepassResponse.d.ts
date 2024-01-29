export interface PurchaseGamepassResponse {
    purchased: boolean;
    reason: string;
    productId: number;
    currency: number;
    price: number;
    assetId: number;
    assetName: string;
    assetType: string;
    assetTypeDisplayName: string;
    assetIsWearable: boolean;
    sellerName: string;
    transactionVerb: string;
    isMultiPrivateSale: boolean;
    title?: string;
    errorMsg?: string;
}
