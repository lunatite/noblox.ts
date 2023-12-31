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
exports.AuthService = void 0;
const axios_1 = __importDefault(require("axios"));
class AuthService {
    constructor(_session) {
        this._session = _session;
    }
    static parseXsrfTokenFromHtml(html) {
        const result = AuthService._xsrfTokenRegex.exec(html);
        if (result === null) {
            throw new Error("Failed to scrape X-CSRF-TOKEN from html.");
        }
        return result[1];
    }
    getXsrfToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this._session.request("https://www.roblox.com/home", "GET");
            return AuthService.parseXsrfTokenFromHtml(request.data);
        });
    }
    static getXsrfToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield axios_1.default.get("https://www.roblox.com/");
            return this.parseXsrfTokenFromHtml(request.data);
        });
    }
}
exports.AuthService = AuthService;
AuthService._xsrfTokenRegex = /data-token="(.+)"/;
