import axios from "axios";
import { CatalogSearch } from "./catalogSearch";
import { RobloxSession } from "../../robloxSession";
import {
  CatalogPagingResponse,
  CatalogItemDetailsResponse,
  CatalogAssetItem,
} from "../../entities/catalog";

import { splitArrayIntoChunks } from "../../utils/splitArrayIntoChunks";
import { AuthService } from "../authService/authService";

export class CatalogService {
  public static readonly baseUrl = "https://catalog.roblox.com/v1/";
  private static readonly CATALOG_ITEM_DETAILS_LIMIT_PER_REQUEST = 100;

  constructor(private readonly _session: RobloxSession) {}

  public static async searchCatalog(options: CatalogSearch) {
    const response = await axios.get<CatalogPagingResponse>(
      `${CatalogService.baseUrl}/search/items`,
      {
        params: options.params,
      },
    );

    const data = response.data;

    return {
      previousPageCursor: data.previousPageCursor,
      nextPageCursor: data.nextPageCursor,
      assetIds: data.data !== null ? data.data.map((asset) => asset.id) : [],
    };
  }

  public static async searchCatalogBulk(options: CatalogSearch, pages = 1) {
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

  public static async getCatalogItemDetails(assetIds: Array<number>) {
    if (assetIds.length > 100) {
      throw new Error("Unable to fetch more than 100 catalog item details.");
    }

    const assets = assetIds.map((assetId) => ({
      itemType: "Asset",
      id: assetId,
    }));

    const token = await AuthService.getXsrfToken();

    const response = await axios.post<CatalogItemDetailsResponse>(
      `${CatalogService.baseUrl}/catalog/items/details`,
      { items: assets },
      { headers: { "X-CSRF-TOKEN": token } },
    );

    return response.data;
  }

  public static async getCatalogItemDetailsBulk(
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
