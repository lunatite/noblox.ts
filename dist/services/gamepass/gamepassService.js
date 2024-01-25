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
exports.GamepassService = void 0;
const axios_1 = __importDefault(require("axios"));
class GamepassService {
    constructor(_session) {
        this._session = _session;
    }
    static getGamepass(gamepassId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield axios_1.default.get(`https://apis.roblox.com/game-passes/v1/game-passes/${gamepassId}/product-info`);
            return resp.data;
        });
    }
    purchase(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this._session.request(`https://economy.roblox.com/v1/purchases/products/${params.gamepassId}`, "POST", {
                data: {
                    expectedCurrency: 1,
                    expectedPrice: params.price,
                    expectedSellerId: params.sellerId,
                },
            });
            return resp.data;
        });
    }
    delete(gamepassId) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData();
            formData.append("id", gamepassId.toString());
            const resp = yield this._session.request("https://www.roblox.com/game-pass/revoke", "POST", { data: formData });
            return resp.data;
        });
    }
}
exports.GamepassService = GamepassService;
