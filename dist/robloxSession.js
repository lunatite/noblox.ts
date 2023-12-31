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
exports.RobloxSession = void 0;
const axios_1 = __importDefault(require("axios"));
const usersService_1 = require("./services/usersService/usersService");
const authService_1 = require("./services/authService/authService");
const catalogService_1 = require("./services/catalogService/catalogService");
const assetDeliverySerivce_1 = require("./services/assetDeliveryService/assetDeliverySerivce");
const groupsSerivce_1 = require("./services/groupsService/groupsSerivce");
const robloxError_1 = require("./robloxError");
class RobloxSession {
    constructor(cookie) {
        this.services = {
            auth: new authService_1.AuthService(this),
            user: new usersService_1.UserService(this),
            catalog: new catalogService_1.CatalogService(this),
            assetDelivery: new assetDeliverySerivce_1.AssetDeliveryService(),
            groups: new groupsSerivce_1.GroupsService(this),
        };
        if (!cookie.toLowerCase().includes("warning:-")) {
            throw new Error("Warning : No Roblox warning detected in provided cookie. Ensure you include the entire .ROBLOSECURITY.");
        }
        if (cookie.length === 0) {
            throw new Error("Cookie cannot be an empty string.");
        }
        this._cookie = cookie;
    }
    get cookie() {
        return this._cookie;
    }
    get user() {
        return this._user;
    }
    request(url, method, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
                Cookie: `.ROBLOSECURITY=${this._cookie}`,
            };
            if (method !== "GET") {
                headers["X-CSRF-TOKEN"] = yield this.services.auth.getXsrfToken();
            }
            try {
                const request = yield axios_1.default(Object.assign(Object.assign({}, config), { url,
                    method, headers: Object.assign(Object.assign({}, config === null || config === void 0 ? void 0 : config.headers), headers) }));
                return request;
            }
            catch (e) {
                throw new robloxError_1.RobloxError(e);
            }
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            this._user = yield this.services.user.getAuthUser();
            return this;
        });
    }
}
exports.RobloxSession = RobloxSession;
