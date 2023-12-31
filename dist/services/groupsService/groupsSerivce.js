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
exports.GroupsService = void 0;
class GroupsService {
    constructor(_session) {
        this._session = _session;
    }
    getGroupFunds(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._session.request(`https://economy.roblox.com/v1/groups/${groupId}/currency`, "GET");
            return response.data.robux;
        });
    }
    getGroup(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this._session.request(`https://groups.roblox.com/v1/groups/${groupId}`, "GET");
            return resp.data;
        });
    }
    getUserGroupMembership(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._session.request(`https://groups.roblox.com/v1/groups/${groupId}/membership`, "GET");
            return response.data;
        });
    }
    getGroupRevenueSummary(groupId, timePeriod) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._session.request(`https://economy.roblox.com/v1/groups/${groupId}/revenue/summary/${timePeriod}`, "GET");
            return response.data;
        });
    }
}
exports.GroupsService = GroupsService;
