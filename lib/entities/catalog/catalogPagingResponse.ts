export interface CatalogAssetIdAndType {
  id: number;
  itemType: "Asset";
}

export interface CatalogPagingResponse {
  keyword: string | null;
  previousPageCursor: string | null;
  nextPageCursor: string | null;
  data: CatalogAssetIdAndType[] | null;
}
