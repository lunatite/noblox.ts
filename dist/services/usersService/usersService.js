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
exports.UserService = void 0;
class UserService {
    constructor(_session) {
        this._session = _session;
    }
    getAuthUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._session.request(`${UserService.baseUrl}/users/authenticated`, "GET");
            return response.data;
        });
    }
    getRobuxBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._session.request("https://economy.roblox.com/v1/user/currency", "GET");
            return response.data.robux;
        });
    }
}
exports.UserService = UserService;
UserService.baseUrl = "https://users.roblox.com/v1/";
