import { CatalogSearchOptions } from "../../entities/catalog/catalogSearchOptions";
export declare class CatalogSearch {
    readonly options: CatalogSearchOptions;
    readonly params: URLSearchParams;
    constructor(options: CatalogSearchOptions);
    private convertOptionsToParams;
}
