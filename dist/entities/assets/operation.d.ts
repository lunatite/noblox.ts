import { UploadedAsset } from "./uploadedAsset";
export interface Operation {
    path: string;
    operationId: string;
    done: boolean;
    response?: UploadedAsset;
}
