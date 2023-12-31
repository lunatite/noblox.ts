import { CatalogSearch } from "./catalogSearch";
import { RobloxSession } from "../../robloxSession";
import {
  CatalogPagingResponse,
  CatalogItemDetailsResponse,
  CatalogAssetItem,
} from "../../entities/catalog";

import { splitArrayIntoChunks } from "../../utils/splitArrayIntoChunks";

export class CatalogService {
  public static readonly baseUrl = "https://catalog.roblox.com/v1/";
  private readonly CATALOG_ITEM_DETAILS_LIMIT_PER_REQUEST = 100;

  constructor(private readonly _session: RobloxSession) {}

  public async searchCatalog(options: CatalogSearch) {
    const response = await this._session.request<CatalogPagingResponse>(
      `${CatalogService.baseUrl}/search/items`,
      "GET",
      { params: options.params },
    );

    const data = response.data;

    return {
      previousPageCursor: data.previousPageCursor,
      nextPageCursor: data.nextPageCursor,
      assetIds: data.data !== null ? data.data.map((asset) => asset.id) : [],
    };
  }

  public async searchCatalogBulk(options: CatalogSearch, pages = 1) {
    let assetIds: number[] = [];

    for (let i = 0; i < pages; i++) {
      const data = await this.searchCatalog(options);

      if (data.nextPageCursor === null) {
        break;
      }

      options = new CatalogSearch({
        ...options.options,
        nextPageCursor: data.nextPageCursor,
      });

      assetIds = [...assetIds, ...data.assetIds];
    }

    return assetIds;
  }

  public async getCatalogItemDetails(assetIds: Array<number>) {
    if (assetIds.length > 100) {
      throw new Error("Unable to fetch more than 100 catalog item details.");
    }

    const assets = assetIds.map((assetId) => ({
      itemType: "Asset",
      id: assetId,
    }));

    const response = await this._session.request<CatalogItemDetailsResponse>(
      `${CatalogService.baseUrl}/catalog/items/details`,
      "POST",
      {
        data: {
          items: assets,
        },
      },
    );

    return response.data;
  }

  public async getCatalogItemDetailsBulk(
    assetIds: Array<number>,
  ): Promise<Array<CatalogAssetItem>> {
    let catalogAssetItems: CatalogAssetItem[] = [];
    const assetIdsChunks = splitArrayIntoChunks(
      assetIds,
      this.CATALOG_ITEM_DETAILS_LIMIT_PER_REQUEST,
    );

    for (let i = 0; i < assetIdsChunks.length; i++) {
      const assetIds = assetIdsChunks[i] as number[];
      const data = await this.getCatalogItemDetails(assetIds);
      catalogAssetItems = [...catalogAssetItems, ...data.data];
    }

    return catalogAssetItems;
  }
}
