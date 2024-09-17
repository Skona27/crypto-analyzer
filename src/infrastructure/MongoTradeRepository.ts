import { Trade } from "../domain/Trade";
import { BaseTradeRepository } from "../interfaces/BaseTradeRepository";
import { TradeModel } from "../schema/TradeSchema";

export class MongoTradeRepository implements BaseTradeRepository {
  public async getTrade(): Promise<Trade> {
    throw Error("Not implemented");
  }

  public async saveTrade(trade: Trade): Promise<void> {
    try {
      const tradeEntity = new TradeModel(trade);
      await tradeEntity.save();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
