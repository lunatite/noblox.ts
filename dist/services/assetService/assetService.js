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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetService = void 0;
const form_data_1 = __importDefault(require("form-data"));
class AssetService {
    constructor(_session) {
        this._session = _session;
    }
    getOperation(operationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._session.request(`https://apis.roblox.com/assets/user-auth/v1/operations/${operationId}`, "GET");
            return response.data;
        });
    }
    updateAssetPrice(assetId, price) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._session.request(`https://itemconfiguration.roblox.com/v1/assets/${assetId}/update-price`, "POST", {
                data: {
                    priceConfiguration: {
                        priceInRobux: price,
                    },
                },
            });
        });
    }
    updateAsset(assetId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._session.request(`https://develop.roblox.com/v1/assets/${assetId}`, "PATCH", { data: options });
        });
    }
    uploadAsset(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                displayName: options.name,
                description: options.description,
                assetType: options.type,
                creationContext: {
                    creator: {
                        [options.isGroup ? "groupId" : "userId"]: options.creatorId,
                    },
                    expectedPrice: 10,
                },
            };
            const formData = new form_data_1.default();
            formData.append("request", JSON.stringify(config));
            formData.append("fileContent", options.file, {
                contentType: "image/png",
            });
            let operation = yield (yield this._session.request("https://apis.roblox.com/assets/user-auth/v1/assets", "POST", { headers: Object.assign({}, formData.getHeaders()) })).data;
            while (!operation.done) {
                yield new Promise((resolve) => setTimeout(resolve, 1500));
                operation = yield yield this.getOperation(operation.operationId);
            }
            return operation.response;
        });
    }
}
exports.AssetService = AssetService;
AssetService.baseUrl = "https://apis.roblox.com/";
