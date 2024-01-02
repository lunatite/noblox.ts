export interface GroupSearchResult {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  previousName: string;
  publicEntryAllowed: boolean;
  created: Date;
  updated: Date;
  hasVerifiedBadge: boolean;
}

export interface GroupSearchResponse {
  keyword: string;
  previousPageCursor?: string;
  nextPageCursor?: string;
  data: GroupSearchResult[];
}
