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
const services_1 = require("./services");
const robloxError_1 = require("./robloxError");
axios_1.default.interceptors.response.use((response) => response, (error) => Promise.reject(new robloxError_1.RobloxError(error)));
class RobloxSession {
    constructor(cookie, proxy) {
        this.services = {
            auth: new services_1.AuthService(this),
            user: new services_1.UsersService(this),
            catalog: new services_1.CatalogService(),
            thumbnails: new services_1.ThumbnailsService(),
            assetDelivery: new services_1.AssetDeliveryService(),
            asset: new services_1.AssetService(this),
            groups: new services_1.GroupsService(this),
        };
        if (!cookie.toLowerCase().includes("warning:-")) {
            throw new robloxError_1.RobloxError(Error("Warning : No Roblox warning detected in provided cookie. Ensure you include the entire .ROBLOSECURITY."));
        }
        if (cookie.length === 0) {
            throw new robloxError_1.RobloxError(Error("Cookie cannot be an empty string."));
        }
        this._cookie = cookie;
        this._proxy = proxy;
        this._axios = axios_1.default.create({
            timeout: 5000,
            proxy,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
                Cookie: `.ROBLOSECURITY=${this._cookie}`,
            },
        });
        this._axios.interceptors.response.use((response) => response, (error) => Promise.reject(new robloxError_1.RobloxError(error)));
    }
    get cookie() {
        return this._cookie;
    }
    get user() {
        return this._user;
    }
    request(url, method, config) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {};
            if (method !== "GET") {
                headers["X-CSRF-TOKEN"] = yield this.services.auth.getXsrfToken();
            }
            const request = yield this._axios.request(Object.assign(Object.assign({}, config), { url,
                method, headers: Object.assign(Object.assign({}, config === null || config === void 0 ? void 0 : config.headers), headers), proxy: this._proxy }));
            return request;
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            const authUser = yield this.services.user.getAuthUser();
            const avatarHeadshotUrl = yield this.services.thumbnails.getUserAvatarHeadshot(authUser.id);
            this._user = Object.assign(Object.assign({}, authUser), { profilePicture: avatarHeadshotUrl });
            return this;
        });
    }
}
exports.RobloxSession = RobloxSession;
