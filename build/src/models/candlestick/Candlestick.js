"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candlestick = void 0;
/**
 * Represents a single candlestick.
 */
class Candlestick {
    constructor(json) {
        this._openingTime = new Date(json[0]);
        this._openingPrice = json[1];
        this._highestPrice = json[2];
        this._lowestPrice = json[3];
        this._closurePrice = json[4];
        this._baseAssetVolume = json[5];
        this._closureTime = new Date(json[6]);
        this._quoteAssetVolume = json[7];
        this._tradesCount = json[8];
        this._boughtBaseAssetVolume = json[9];
        this._boughtQuoteAssetVolume = json[10];
    }
    get openingTime() {
        return this._openingTime;
    }
    set openingTime(value) {
        this._openingTime = value;
    }
    get openingPrice() {
        return this._openingPrice;
    }
    set openingPrice(value) {
        this._openingPrice = value;
    }
    get highestPrice() {
        return this._highestPrice;
    }
    set highestPrice(value) {
        this._highestPrice = value;
    }
    get lowestPrice() {
        return this._lowestPrice;
    }
    set lowestPrice(value) {
        this._lowestPrice = value;
    }
    get closurePrice() {
        return this._closurePrice;
    }
    set closurePrice(value) {
        this._closurePrice = value;
    }
    get baseAssetVolume() {
        return this._baseAssetVolume;
    }
    set baseAssetVolume(value) {
        this._baseAssetVolume = value;
    }
    get closureTime() {
        return this._closureTime;
    }
    set closureTime(value) {
        this._closureTime = value;
    }
    get quoteAssetVolume() {
        return this._quoteAssetVolume;
    }
    set quoteAssetVolume(value) {
        this._quoteAssetVolume = value;
    }
    get tradesCount() {
        return this._tradesCount;
    }
    set tradesCount(value) {
        this._tradesCount = value;
    }
    get boughtBaseAssetVolume() {
        return this._boughtBaseAssetVolume;
    }
    set boughtBaseAssetVolume(value) {
        this._boughtBaseAssetVolume = value;
    }
    get boughtQuoteAssetVolume() {
        return this._boughtQuoteAssetVolume;
    }
    set boughtQuoteAssetVolume(value) {
        this._boughtQuoteAssetVolume = value;
    }
}
exports.Candlestick = Candlestick;
//# sourceMappingURL=Candlestick.js.map