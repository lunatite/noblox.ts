/// <reference types="node" />
import fs from "fs";
export declare class AssetDeliveryService {
    static readonly baseUrl = "https://assetdelivery.roblox.com/v1/";
    private static readonly _assetIdRegex;
    static getAssetTemplateUrl(assetId: number): Promise<string>;
    static getAssetTemplateBuffer(assetId: number): Promise<fs.ReadStream>;
}
