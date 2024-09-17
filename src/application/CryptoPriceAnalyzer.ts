import { PriceChange } from "../domain/Price";
import { Trade } from "../domain/Trade";
import { CryptoApiClient } from "../interfaces/CryptoApiClient";
import { BaseTradeRepository } from "../interfaces/BaseTradeRepository";
import { CryptoUseCase } from "../interfaces/CryptoUseCase";

interface AnalyzerInput {
  symbol: string;
  timestamp: number;
}

export class CryptoPriceAnalyzer
  implements CryptoUseCase<AnalyzerInput, PriceChange>
{
  constructor(
    private readonly tradeApiService: CryptoApiClient,
    private readonly tradeRepository: BaseTradeRepository
  ) {}

  public async execute({ symbol, timestamp }: AnalyzerInput) {
    try {
      const trades = await this.tradeApiService.getTrades(symbol, timestamp);

      if (trades.length === 0) {
        throw new Error("No trades were fetched");
      }

      return this.analyzePrices(trades);
    } catch (err) {
      console.error(err);
      throw new Error("Failed to analyze prices");
    }
  }

  private analyzePrices(trades: Trade[]): PriceChange {
    const { price: firstTradePrice } = trades[0];
    const { price: lastTradePrice } = trades[trades.length - 1];

    if (lastTradePrice > firstTradePrice) {
      return "INCREASE";
    }

    if (lastTradePrice < firstTradePrice) {
      return "DECREASE";
    }

    return "NO_CHANGE";
  }
}
