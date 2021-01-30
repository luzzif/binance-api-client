"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickerStatistics = void 0;
/**
 * Represents a single 24-hr ticker statistics collection.
 */
class TickerStatistics {
    constructor(json) {
        this._priceChange = json.priceChange;
        this._priceChangePercentage = json.priceChangePercent;
        this._weightedAveragePrice = json.weightedAvgPrice;
        this._previousClosurePrice = json.prevClosePrice;
        this._lastPrice = json.lastPrice;
        this._bidPrice = json.bidPrice;
        this._askPrice = json.askPrice;
        this._openingPrice = json.openPrice;
        this._highestPrice = json.highPrice;
        this._lowestPrice = json.lowPrice;
        this._volume = json.volume;
        this._openingTime = new Date(json.openTime);
        this._closureTime = new Date(json.closeTime);
        this._firstTradeId = json.firstId;
        this._lastTradeId = json.lastId;
        this._tradesCount = json.count;
    }
    get priceChange() {
        return this._priceChange;
    }
    set priceChange(value) {
        this._priceChange = value;
    }
    get priceChangePercentage() {
        return this._priceChangePercentage;
    }
    set priceChangePercentage(value) {
        this._priceChangePercentage = value;
    }
    get weightedAveragePrice() {
        return this._weightedAveragePrice;
    }
    set weightedAveragePrice(value) {
        this._weightedAveragePrice = value;
    }
    get previousClosurePrice() {
        return this._previousClosurePrice;
    }
    set previousClosurePrice(value) {
        this._previousClosurePrice = value;
    }
    get lastPrice() {
        return this._lastPrice;
    }
    set lastPrice(value) {
        this._lastPrice = value;
    }
    get bidPrice() {
        return this._bidPrice;
    }
    set bidPrice(value) {
        this._bidPrice = value;
    }
    get askPrice() {
        return this._askPrice;
    }
    set askPrice(value) {
        this._askPrice = value;
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
    get volume() {
        return this._volume;
    }
    set volume(value) {
        this._volume = value;
    }
    get openingTime() {
        return this._openingTime;
    }
    set openingTime(value) {
        this._openingTime = value;
    }
    get closureTime() {
        return this._closureTime;
    }
    set closureTime(value) {
        this._closureTime = value;
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
    get tradesCount() {
        return this._tradesCount;
    }
    set tradesCount(value) {
        this._tradesCount = value;
    }
}
exports.TickerStatistics = TickerStatistics;
//# sourceMappingURL=TickerStatistics.js.map