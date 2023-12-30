import { RobloxSession } from "../../robloxSession";
import { CatalogSearch } from "./catalogSearch";
import { CatalogItemDetailsResponse } from "../../entities/catalog/catalogItemDetailsResponse";
import { CatalogAssetItem } from "../../entities/catalog/catalogAssetItem";
export declare class CatalogService {
    private readonly _session;
    static readonly baseUrl = "https://catalog.roblox.com/v1/";
    private readonly CATALOG_ITEM_DETAILS_LIMIT_PER_REQUEST;
    constructor(_session: RobloxSession);
    searchCatalog(options: CatalogSearch): Promise<{
        previousPageCursor: string | null;
        nextPageCursor: string | null;
        assetIds: number[];
    }>;
    searchCatalogBulk(options: CatalogSearch, pages?: number): Promise<number[]>;
    getCatalogItemDetails(assetIds: Array<number>): Promise<CatalogItemDetailsResponse>;
    getCatalogItemDetailsBulk(assetIds: Array<number>): Promise<Array<CatalogAssetItem>>;
}
