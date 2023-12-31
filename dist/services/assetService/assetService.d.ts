import { UploadAssetOptions, Operation, UpdateAssetOptions, UploadedAsset } from "../../entities";
import { RobloxSession } from "../../robloxSession";
export declare class AssetService {
    private readonly _session;
    static readonly baseUrl = "https://apis.roblox.com/";
    constructor(_session: RobloxSession);
    getOperation(operationId: string): Promise<Operation>;
    updateAssetPrice(assetId: number, price: number): Promise<void>;
    setAssetOnSale(assetId: number, price: number): Promise<void>;
    updateAsset(assetId: number, options: UpdateAssetOptions): Promise<void>;
    uploadAsset(options: UploadAssetOptions): Promise<UploadedAsset>;
}
