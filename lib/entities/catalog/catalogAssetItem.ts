export interface CatalogAssetItem {
  id: number;
  itemType: "Asset";
  assetType: number;
  name: string;
  description: string | null;
  productId: number;
  price: number;
}
