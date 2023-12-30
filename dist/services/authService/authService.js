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
exports.AuthService = void 0;
class AuthService {
    constructor(_session) {
        this._session = _session;
    }
    getXsrfToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this._session.request("https://www.roblox.com/home", "GET");
            const result = AuthService._xsrfTokenRegex.exec(request.data);
            if (result === null) {
                throw new Error("Failed to scrape X-CSRF-TOKEN from page.");
            }
            return result[1];
        });
    }
}
exports.AuthService = AuthService;
AuthService._xsrfTokenRegex = /data-token="(.+)"/;
