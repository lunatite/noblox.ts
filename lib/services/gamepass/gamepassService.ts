import axios from "axios";
import { RobloxSession } from "../../robloxSession";
import { GamepassProduct } from "../../entities/gamepass/gamepassProductResponse";
import { PurchaseGamepassParams } from "../../entities/gamepass/purchaseGamepassParams";
import { PurchaseGamepassResponse } from "../../entities/gamepass/purchaseGamepassResponse";
import { DeleteGamepassResponse } from "../../entities/gamepass";

export class GamepassService {
  constructor(private readonly _session: RobloxSession) {}

  public static async getGamepass(gamepassId: number) {
    const resp = await axios.get<GamepassProduct>(
      `https://apis.roblox.com/game-passes/v1/game-passes/${gamepassId}/product-info`,
    );
    return resp.data;
  }

  public async purchase(params: PurchaseGamepassParams) {
    const resp = await this._session.request<PurchaseGamepassResponse>(
      `https://economy.roblox.com/v1/purchases/products/${params.gamepassId}`,
      "POST",
      {
        data: {
          expectedCurrency: 1,
          expectedPrice: params.price,
          expectedSellerId: params.sellerId,
        },
      },
    );

    return resp.data;
  }

  public async delete(gamepassId: number) {
    const formData = new FormData();
    formData.append("id", gamepassId.toString());

    const resp = await this._session.request<DeleteGamepassResponse>(
      "https://www.roblox.com/game-pass/revoke",
      "POST",
      { data: formData },
    );
    return resp.data;
  }
}
