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
exports.AssetDeliveryService = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
class AssetDeliveryService {
    static getAssetTemplateUrl(assetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this.baseUrl}/asset?id=${assetId}`);
            const result = this._assetIdRegex.exec(response.data);
            if (result === null) {
                throw new Error("Failed to fetch asset id from asset file.");
            }
            return `https://assetdelivery.roblox.com/v1/asset?id=${result[1]}`;
        });
    }
    static getAssetTemplateBuffer(assetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateUrl = yield this.getAssetTemplateUrl(assetId);
            const templateArrayBuffer = yield axios_1.default.get(templateUrl, {
                responseType: "arraybuffer",
            });
            const templateBuffer = Buffer.from(templateArrayBuffer.data, "binary");
            return fs_1.default.createReadStream(templateBuffer);
        });
    }
}
exports.AssetDeliveryService = AssetDeliveryService;
AssetDeliveryService.baseUrl = "https://assetdelivery.roblox.com/v1/";
AssetDeliveryService._assetIdRegex = /id=([0-9]+)/;
