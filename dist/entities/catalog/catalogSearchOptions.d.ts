import { CatalogCategory } from "./catalogCategory";
import { CatalogSortAggregation } from "./catalogSortAggregation";
import { CatalogSortType } from "./catalogSortType";
import { CatalogSubCategory } from "./catalogSubCategory";
export interface CatalogSearchOptions {
    category: CatalogCategory;
    subCategory?: CatalogSubCategory;
    sortType?: CatalogSortType;
    aggregation?: CatalogSortAggregation;
    creatorType?: string;
    creatorName?: string;
    keyword?: string;
    nextPageCursor?: string;
}
