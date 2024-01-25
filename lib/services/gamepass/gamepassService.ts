import axios from "axios";
import { RobloxSession } from "../../robloxSession";
import { GamepassProductResponse } from "../../entities/product/gamepassProductResponse";

export class GamepassService {
  constructor(private readonly _session: RobloxSession) {}

  public static async getGamepass(gamepassId: number) {
    const resp = await axios.get<GamepassProductResponse>(
      `https://apis.roblox.com/game-passes/v1/game-passes/${gamepassId}/product-info`,
    );
    return resp.data;
  }
}
