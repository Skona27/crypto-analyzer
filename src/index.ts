import { CryptoPriceAnalyzer } from "./application/CryptoPriceAnalyzer";
import { AxiosClient } from "./infrastructure/AxiosClient";
import { BinanceApiClient } from "./infrastructure/BinanceApiClient";
import { MongoTradeRepository } from "./infrastructure/MongoTradeRepository";

async function PriceAnalyzerApp() {
  const SYMBOL = "BTC";
  const BINANCE_BASE_URL = "https://api.binance.com";

  const httpClient = new AxiosClient(BINANCE_BASE_URL);
  const tradeRepository = new MongoTradeRepository();
  const apiClient = new BinanceApiClient(httpClient);

  const priceAnalyzerUseCase = new CryptoPriceAnalyzer(
    apiClient,
    tradeRepository
  );

  const result = await priceAnalyzerUseCase.execute({
    symbol: SYMBOL,
    timestamp: Date.now(),
  });

  console.log(`The price analysis for ${SYMBOL} is: ${result}`);
}

PriceAnalyzerApp();
