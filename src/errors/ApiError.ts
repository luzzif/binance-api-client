/**
 * Thrown when Binance's API response is identified as an error.
 * Both code and message are taken from the response message itself
 * and are returned from the client directly from Binance, without
 * alterations.
 */
export class ApiError extends Error {
  constructor(code: number, message: string) {
    super("Error code: " + code + ", message: " + message);
  }
}
