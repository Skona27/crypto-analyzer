export interface CryptoUseCase<Input, Output> {
  execute(params: Input): Promise<Output>;
}
