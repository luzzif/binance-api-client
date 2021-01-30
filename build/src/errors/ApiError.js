"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
/**
 * Thrown when Binance's API response is identified as an error.
 * Both code and message are taken from the response message itself
 * and are returned from the client directly from Binance, without
 * alterations.
 */
class ApiError extends Error {
    constructor(code, message) {
        super("Error code: " + code + ", message: " + message);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map