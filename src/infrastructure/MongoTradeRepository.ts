import { Trade } from "../domain/Trade";
import { BaseTradeRepository } from "../interfaces/BaseTradeRepository";

export class MongoTradeRepository implements BaseTradeRepository {
  public async getTrade(): Promise<Trade> {
    throw Error("Not implemented");
  }

  public async saveTrade(trade: Trade): Promise<void> {}
}
