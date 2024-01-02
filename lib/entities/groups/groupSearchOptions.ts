export interface GroupSearchOptions {
  cursor?: string;
  keyword: string;
  limit?: 10 | 25 | 50 | 100;
  sortOrder?: "Asc" | "Desc";
}
