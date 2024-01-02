import { GroupSearchOptions } from "../../entities/groups/groupSearchOptions";

export class GroupSearch {
  public readonly params: URLSearchParams;

  constructor(public readonly options: GroupSearchOptions) {
    this.params = this.convertOptionsToParams();
  }

  private convertOptionsToParams(): URLSearchParams {
    const params = new URLSearchParams();

    params.set("cursor", this.options.cursor ?? "");
    params.set("keyword", this.options.keyword);
    params.set("limit", (this.options.limit ?? 100).toString());
    params.set("prioritizeExactMatch", "true");
    params.set("sortOrder", this.options.sortOrder ?? "Asc");

    return params;
  }
}
