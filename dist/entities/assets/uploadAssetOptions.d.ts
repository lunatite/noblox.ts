/// <reference types="node" />
import fs from "fs";
export interface UploadAssetOptions {
    file: fs.ReadStream;
    creatorId: number;
    name: string;
    description?: string;
    type: "Shirt" | "Pants";
    isGroup: boolean;
}
