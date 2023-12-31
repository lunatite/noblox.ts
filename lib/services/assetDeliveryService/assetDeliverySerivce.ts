import axios from "axios";

export class AssetDeliveryService {
  public static readonly baseUrl = "https://assetdelivery.roblox.com/v1/";
  private static readonly _assetIdRegex = /id=([0-9]+)/;

  public static async getAssetTemplateUrl(assetId: number) {
    const response = await axios.get<string>(
      `${this.baseUrl}/asset?id=${assetId}`,
    );
    const result = this._assetIdRegex.exec(response.data);

    if (result === null) {
      throw new Error("Failed to fetch asset id from asset file.");
    }

    return `https://assetdelivery.roblox.com/v1/asset?id=${result[1]}`;
  }

  public static async getAssetTemplateBuffer(assetId: number) {
    const templateUrl = await this.getAssetTemplateUrl(assetId);
    const templateArrayBuffer = await axios.get(templateUrl, {
      responseType: "arraybuffer",
    });

    const templateBuffer = Buffer.from(templateArrayBuffer.data);
    return templateBuffer;
  }
}
