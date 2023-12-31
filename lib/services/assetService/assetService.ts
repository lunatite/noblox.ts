import FormData from "form-data";
import {
  UploadAssetOptions,
  Operation,
  UpdateAssetOptions,
  UploadedAsset,
} from "../../entities";
import { RobloxSession } from "../../robloxSession";

export class AssetService {
  public static readonly baseUrl = "https://apis.roblox.com/";

  constructor(private readonly _session: RobloxSession) {}

  public async getOperation(operationId: string) {
    const response = await this._session.request<Operation>(
      `https://apis.roblox.com/assets/user-auth/v1/operations/${operationId}`,
      "GET",
    );
    return response.data;
  }

  public async updateAssetPrice(assetId: number, price: number) {
    await this._session.request(
      `https://itemconfiguration.roblox.com/v1/assets/${assetId}/update-price`,
      "POST",
      {
        data: {
          priceConfiguration: {
            priceInRobux: price,
          },
        },
      },
    );
  }

  public async setAssetOnSale(assetId: number, price: number) {
    await this._session.request(
      `https://itemconfiguration.roblox.com/v1/assets/${assetId}/release`,
      "POST",
      {
        data: {
          price,
          priceConfiguration: {
            priceInRobux: price,
          },
          saleStatus: "onSale",
        },
      },
    );
  }

  public async updateAsset(assetId: number, options: UpdateAssetOptions) {
    await this._session.request(
      `https://develop.roblox.com/v1/assets/${assetId}`,
      "PATCH",
      { data: options },
    );
  }

  public async uploadAsset(
    options: UploadAssetOptions,
  ): Promise<UploadedAsset> {
    const config = {
      displayName: options.name,
      description: options.description,
      assetType: options.type,
      creationContext: {
        creator: {
          [options.isGroup ? "groupId" : "userId"]: options.creatorId,
        },
        expectedPrice: 10, // client does not define this value when uploading...
      },
    };

    const formData = new FormData();

    formData.append("request", JSON.stringify(config));
    formData.append("fileContent", options.file, {
      contentType: "image/png",
    });

    const response = await this._session.request<Operation>(
      "https://apis.roblox.com/assets/user-auth/v1/assets",
      "POST",
      { headers: { ...formData.getHeaders() }, data: formData },
    );

    let operation = response.data;

    while (!operation.done) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      operation = await this.getOperation(operation.operationId);
    }

    return operation.response!;
  }
}
