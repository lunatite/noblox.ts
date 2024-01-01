"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobloxError = void 0;
function getErrorMessage(error) {
    if (!error.response) {
        return "";
    }
    const errorRespData = error.response.data;
    if (errorRespData.errors) {
        return errorRespData.errors;
    }
    return errorRespData.message;
}
class RobloxError extends Error {
    constructor(error) {
        var _a, _b;
        super(getErrorMessage(error));
        this.url = (_a = error.response) === null || _a === void 0 ? void 0 : _a.config.url;
        this.statusCode = (_b = error.response) === null || _b === void 0 ? void 0 : _b.status;
        this.name = "RobloxError";
    }
}
exports.RobloxError = RobloxError;
