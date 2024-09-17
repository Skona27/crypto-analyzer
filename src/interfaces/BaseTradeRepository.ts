import { Trade } from "../domain/Trade";

export interface BaseTradeRepository {
  saveTrade(trade: Trade): Promise<void>
  getTrade(id: string): Promise<Trade>
}