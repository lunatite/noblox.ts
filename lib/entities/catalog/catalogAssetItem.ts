export interface CatalogAssetItem {
  id: number;
  itemType: "Asset";
  assetType: number;
  name: string;
  description: string | null;
  productId: number;
  price: number;
  purchaseCount: number;
  creatorHasVerifiedBadge: boolean;
  creatorType: "Group";
  creatorTargetId: number;
  creatorName: string;
  favoriteCount: number;
  offSaleDeadline: null;
  saleLocationType: "NotApplicable";
}
