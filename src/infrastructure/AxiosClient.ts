import { HttpClient } from "../interfaces/HttpClient";

import axios, { AxiosInstance } from "axios";

export class AxiosClient implements HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 1000,
    });
  }

  public async get<T>(url: string): Promise<T> {
    try {
      return await this.instance.get(url);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
