import { RobloxSession } from "../../robloxSession";
import { GamepassProduct } from "../../entities/gamepass/gamepassProductResponse";
import { PurchaseGamepassParams } from "../../entities/gamepass/purchaseGamepassParams";
import { PurchaseGamepassResponse } from "../../entities/gamepass/purchaseGamepassResponse";
import { DeleteGamepassResponse } from "../../entities/gamepass";
export declare class GamepassService {
    private readonly _session;
    constructor(_session: RobloxSession);
    static getGamepass(gamepassId: number): Promise<GamepassProduct | null>;
    purchase(params: PurchaseGamepassParams): Promise<PurchaseGamepassResponse>;
    delete(gamepassId: number): Promise<DeleteGamepassResponse>;
}
