"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trade = void 0;
/**
 * Represents a single trade.
 */
class Trade {
    constructor(json) {
        this._id = json.id;
        this._orderId = json.orderId;
        this._price = json.price;
        this._quantity = json.qty;
        this._commission = json.commission;
        this._commissionAsset = json.commissionAsset;
        this._timestamp = new Date(json.time);
        this._buyer = json.isBuyer;
        this._maker = json.isMaker;
        this._bestMatch = json.isBestMatch;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get orderId() {
        return this._orderId;
    }
    set orderId(value) {
        this._orderId = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(value) {
        this._quantity = value;
    }
    get commission() {
        return this._commission;
    }
    set commission(value) {
        this._commission = value;
    }
    get commissionAsset() {
        return this._commissionAsset;
    }
    set commissionAsset(value) {
        this._commissionAsset = value;
    }
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
    get buyer() {
        return this._buyer;
    }
    set buyer(value) {
        this._buyer = value;
    }
    get maker() {
        return this._maker;
    }
    set maker(value) {
        this._maker = value;
    }
    get bestMatch() {
        return this._bestMatch;
    }
    set bestMatch(value) {
        this._bestMatch = value;
    }
}
exports.Trade = Trade;
//# sourceMappingURL=Trade.js.map