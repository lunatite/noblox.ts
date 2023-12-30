import { CatalogSearchOptions } from "../../entities/catalog/catalogSearchOptions";
import { CatalogSortType } from "../../entities/catalog/catalogSortType";

export class CatalogSearch {
  public readonly params: URLSearchParams;

  constructor(public readonly options: CatalogSearchOptions) {
    this.params = this.convertOptionsToParams();
  }

  private convertOptionsToParams(): URLSearchParams {
    const params = new URLSearchParams();

    params.set("category", this.options.category);
    params.set("limit", "120");
    params.set("salesTypeFilter", "1");

    if (this.options.subCategory) {
      params.append("subcategory", this.options.subCategory);
    }

    const sortType = this.options.sortType;

    if (sortType) {
      params.append("sortType", sortType.toString());
    }

    // most favorited and best selling required another sub category (aggregation) for sorting.
    // past day (1) , past week (3) , all time (5)
    if (
      (sortType === CatalogSortType.Most_Favorited ||
        sortType === CatalogSortType.Best_Selling) &&
      !this.options.aggregation
    ) {
      throw new Error(
        "Sort type 'Most Favorited' and 'Bestselling' requires the aggregation field.",
      );
    }

    if (this.options.aggregation) {
      params.append("sortAggregation", this.options.aggregation.toString());
    }

    if (this.options.nextPageCursor) {
      params.append("cursor", this.options.nextPageCursor);
    }

    if (this.options.keyword) {
      params.append("keyword", this.options.keyword);
    }

    if (this.options.creatorName) {
      params.append("creatorName", this.options.creatorName);
    }

    if (this.options.creatorType) {
      params.append("creatorType", this.options.creatorType);
    }

    return params;
  }
}
