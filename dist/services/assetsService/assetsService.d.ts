import { UploadAssetOptions } from "../../entities/assets/uploadAssetOptions";
import { RobloxSession } from "../../robloxSession";
import { Operation } from "../../entities/assets/operation";
import { UpdateAssetOptions } from "../../entities/assets/updateAssetOptions";
export declare class AssetsService {
    private readonly _session;
    static readonly baseUrl = "https://apis.roblox.com/";
    constructor(_session: RobloxSession);
    getOperation(operationId: string): Promise<Operation>;
    updateAssetPrice(assetId: number, price: number): Promise<void>;
    updateAsset(assetId: number, options: UpdateAssetOptions): Promise<void>;
    uploadAsset(options: UploadAssetOptions): Promise<import("../../entities/assets/uploadedAsset").UploadedAsset | undefined>;
}
