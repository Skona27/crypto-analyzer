import { Trade } from "../domain/Trade";

export interface CryptoApiClient {
  getTrades(symbol: string, timestamp: number): Promise<Trade[]>;
}
