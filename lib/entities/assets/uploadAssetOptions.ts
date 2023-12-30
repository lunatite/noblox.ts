import fs from "fs";

export interface AssetInfo {
  name: string;
  description?: string;
  assetType: "Shirt" | "Pants";
}

export interface UploadAssetOptions {
  file: fs.ReadStream;
  creatorId: number;
  assetInfo: AssetInfo;
  isGroup: boolean;
}
