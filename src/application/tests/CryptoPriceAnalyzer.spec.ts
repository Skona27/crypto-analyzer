import { Trade } from "../../domain/Trade";
import { BaseTradeRepository } from "../../interfaces/BaseTradeRepository";
import { CryptoApiClient } from "../../interfaces/CryptoApiClient";
import { CryptoPriceAnalyzer } from "../CryptoPriceAnalyzer";

describe("CryptoPriceAnalyzer", () => {
  const repositoryMock = {};

  const apiServiceMock = {
    getTrades: jest.fn(),
  };

  const cryptoAnalizer = new CryptoPriceAnalyzer(
    apiServiceMock as CryptoApiClient,
    repositoryMock as BaseTradeRepository
  );

  const params = { symbol: "BTC", timestamp: 0 };

  const tradeMock: Trade = {
    id: "1",
    price: 1,
    symbol: "BTC",
    timestamp: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error when no trades", async () => {
    apiServiceMock.getTrades.mockResolvedValue([]);

    expect(cryptoAnalizer.execute(params)).rejects.toThrow(
      "Failed to analyze prices"
    );
  });

  it("should communicate with external API", async () => {
    apiServiceMock.getTrades.mockResolvedValue([tradeMock]);

    cryptoAnalizer.execute(params);

    expect(apiServiceMock.getTrades).toHaveBeenCalledTimes(1);
    expect(apiServiceMock.getTrades).toHaveBeenCalledWith(
      params.symbol,
      params.timestamp
    );
  });

  it("should compare prices", async () => {
    apiServiceMock.getTrades.mockResolvedValue([
      {
        ...tradeMock,
        price: 10,
        id: 1,
      },
      {
        ...tradeMock,
        price: 15,
        id: 2,
      },
    ]);

    const result = await cryptoAnalizer.execute(params);

    expect(result).toEqual("INCREASE");
  });
});
