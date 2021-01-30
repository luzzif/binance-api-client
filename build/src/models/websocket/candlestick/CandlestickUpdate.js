"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandlestickUpdate = void 0;
/**
 * Represents a single candlestick update.
 */
class CandlestickUpdate {
    constructor(json) {
        this._timestamp = new Date(json.E);
        this._symbol = json.s;
        this._openingTime = new Date(json.k.t);
        this._openingPrice = json.k.o;
        this._highestPrice = json.k.h;
        this._lowestPrice = json.k.l;
        this._closurePrice = json.k.c;
        this._baseAssetVolume = json.k.v;
        this._closureTime = new Date(json.k.T);
        this._quoteAssetVolume = json.k.q;
        this._tradesCount = json.k.n;
        this._boughtBaseAssetVolume = json.k.V;
        this._boughtQuoteAssetVolume = json.k.Q;
        this._firstTradeId = json.k.f;
        this._lastTradeId = json.k.L;
        this._interval = json.k.i;
        this._final = json.k.x;
        this._activeBuyVolume = json.k.V;
    }
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
    get symbol() {
        return this._symbol;
    }
    set symbol(value) {
        this._symbol = value;
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
    get firstTradeId() {
        return this._firstTradeId;
    }
    set firstTradeId(value) {
        this._firstTradeId = value;
    }
    get lastTradeId() {
        return this._lastTradeId;
    }
    set lastTradeId(value) {
        this._lastTradeId = value;
    }
    get interval() {
        return this._interval;
    }
    set interval(value) {
        this._interval = value;
    }
    get final() {
        return this._final;
    }
    set final(value) {
        this._final = value;
    }
    get activeBuyVolume() {
        return this._activeBuyVolume;
    }
    set activeBuyVolume(value) {
        this._activeBuyVolume = value;
    }
}
exports.CandlestickUpdate = CandlestickUpdate;
//# sourceMappingURL=CandlestickUpdate.js.map