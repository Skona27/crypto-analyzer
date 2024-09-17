import { Trade } from "../domain/Trade";
import { CryptoApiClient } from "../interfaces/CryptoApiClient";
import { HttpClient } from "../interfaces/HttpClient";

export class BinanceApiClient implements CryptoApiClient {
  constructor(private readonly httpClient: HttpClient) {}

  public async getTrades(symbol: string, timestamp: number): Promise<Trade[]> {
    const endpoint = `/api/v3/trades`;

    try {
      const response: Trade[] = await this.httpClient.get(endpoint, {
        symbol,
        timestamp,
      });

      return response;
    } catch {
      console.error("Something went wrong with fetching data");
      throw new Error("Failed to fetch data from Binance API");
    }
  }
}
