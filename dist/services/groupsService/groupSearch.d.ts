import { GroupSearchOptions } from "../../entities/groups/groupSearchOptions";
export declare class GroupSearch {
    readonly options: GroupSearchOptions;
    readonly params: URLSearchParams;
    constructor(options: GroupSearchOptions);
    private convertOptionsToParams;
}
