import { Trade } from "../domain/Trade";

export interface BaseTradeApiService {
  getRecentTrades(symbol: string): Promise<Trade[]>;
}
