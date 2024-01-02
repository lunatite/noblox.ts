"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupSearch = void 0;
class GroupSearch {
    constructor(options) {
        this.options = options;
        this.params = this.convertOptionsToParams();
    }
    convertOptionsToParams() {
        var _a, _b, _c;
        const params = new URLSearchParams();
        params.set("cursor", (_a = this.options.cursor) !== null && _a !== void 0 ? _a : "");
        params.set("keyword", this.options.keyword);
        params.set("limit", ((_b = this.options.limit) !== null && _b !== void 0 ? _b : 100).toString());
        params.set("prioritizeExactMatch", "true");
        params.set("sortOrder", (_c = this.options.sortOrder) !== null && _c !== void 0 ? _c : "Asc");
        return params;
    }
}
exports.GroupSearch = GroupSearch;
