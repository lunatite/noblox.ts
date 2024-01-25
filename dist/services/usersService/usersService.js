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
exports.UsersService = void 0;
const axios_1 = __importDefault(require("axios"));
class UsersService {
    constructor(_session) {
        this._session = _session;
    }
    getAuthUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._session.request(`${UsersService.baseUrl}/users/authenticated`, "GET");
            return response.data;
        });
    }
    getRobuxBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._session.request("https://economy.roblox.com/v1/user/currency", "GET");
            return response.data.robux;
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${UsersService.baseUrl}/users/${userId}`);
            return response.data;
        });
    }
    static getUsersByUsernames(usernames, excludeBannedUsers = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.post(`${UsersService.baseUrl}/usernames/users`, { usernames, excludeBannedUsers });
            return response.data;
        });
    }
    static getUserByUsername(username, returnNullIfBanned = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.getUsersByUsernames([username], returnNullIfBanned);
            return users.data.length !== 0 ? users.data[0] : null;
        });
    }
}
exports.UsersService = UsersService;
UsersService.baseUrl = "https://users.roblox.com/v1";
