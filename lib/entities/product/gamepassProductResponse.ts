export interface GamepassProductResponse {
  TargetId: number;
  ProductType: string;
  AssetId: number;
  ProductId: number;
  Name: string;
  Description: string;
  AssetTypeId: number;
  Creator: Creator;
  IconImageAssetId: number;
  Created: string;
  Updated: string;
  PriceInRobux: number;
  PriceInTickets: any;
  Sales: number;
  IsNew: boolean;
  IsForSale: boolean;
  IsPublicDomain: boolean;
  IsLimited: boolean;
  IsLimitedUnique: boolean;
  Remaining: any;
  MinimumMembershipLevel: number;
}

export interface Creator {
  Id: number;
  Name: string;
  CreatorType: string;
  CreatorTargetId: number;
}
