"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogService = void 0;
const catalogSearch_1 = require("./catalogSearch");
const splitArrayIntoChunks_1 = require("../../utils/splitArrayIntoChunks");
class CatalogService {
    constructor(_session) {
        this._session = _session;
        this.CATALOG_ITEM_DETAILS_LIMIT_PER_REQUEST = 100;
    }
    searchCatalog(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._session.request(`${CatalogService.baseUrl}/search/items`, "GET", { params: options.params });
            const data = response.data;
            return {
                previousPageCursor: data.previousPageCursor,
                nextPageCursor: data.nextPageCursor,
                assetIds: data.data !== null ? data.data.map((asset) => asset.id) : [],
            };
        });
    }
    searchCatalogBulk(options, pages = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            let assetIds = [];
            for (let i = 0; i < pages; i++) {
                const data = yield this.searchCatalog(options);
                if (data.nextPageCursor === null) {
                    break;
                }
                options = new catalogSearch_1.CatalogSearch(Object.assign(Object.assign({}, options.options), { nextPageCursor: data.nextPageCursor }));
                assetIds = [...assetIds, ...data.assetIds];
            }
            return assetIds;
        });
    }
    getCatalogItemDetails(assetIds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (assetIds.length > 100) {
                throw new Error("Unable to fetch more than 100 catalog item details.");
            }
            const assets = assetIds.map((assetId) => ({
                itemType: "Asset",
                id: assetId,
            }));
            const response = yield this._session.request(`${CatalogService.baseUrl}/catalog/items/details`, "POST", {
                data: {
                    items: assets,
                },
            });
            return response.data;
        });
    }
    getCatalogItemDetailsBulk(assetIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let catalogAssetItems = [];
            const assetIdsChunks = splitArrayIntoChunks_1.splitArrayIntoChunks(assetIds, this.CATALOG_ITEM_DETAILS_LIMIT_PER_REQUEST);
            for (let i = 0; i < assetIdsChunks.length; i++) {
                const assetIds = assetIdsChunks[i];
                const data = yield this.getCatalogItemDetails(assetIds);
                catalogAssetItems = [...catalogAssetItems, ...data.data];
            }
            return catalogAssetItems;
        });
    }
}
exports.CatalogService = CatalogService;
CatalogService.baseUrl = "https://catalog.roblox.com/v1/";
