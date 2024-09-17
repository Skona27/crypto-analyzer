export interface HttpClient {
  get<T>(url: string, params: Record<string, unknown>): Promise<T>;
}
