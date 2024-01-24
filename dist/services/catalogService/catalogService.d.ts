import { CatalogSearch } from "./catalogSearch";
import { CatalogItemDetailsResponse, CatalogAssetItem } from "../../entities/catalog";
export declare class CatalogService {
    static readonly baseUrl = "https://catalog.roblox.com/v1/";
    private static readonly CATALOG_ITEM_DETAILS_LIMIT_PER_REQUEST;
    static searchCatalog(options: CatalogSearch): Promise<{
        previousPageCursor: string | null;
        nextPageCursor: string | null;
        assetIds: number[];
    }>;
    static searchCatalogBulk(options: CatalogSearch, pages?: number): Promise<number[]>;
    static getCatalogItemDetails(assetIds: Array<number>): Promise<CatalogItemDetailsResponse>;
    static getCatalogItemDetailsBulk(assetIds: Array<number>): Promise<Array<CatalogAssetItem>>;
}
