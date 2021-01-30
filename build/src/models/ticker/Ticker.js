"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticker = void 0;
/**
 * Represents a single ticker.
 */
class Ticker {
    constructor(json) {
        this._symbol = json.symbol;
        this._bidPrice = json.bidPrice;
        this._bidQuantity = json.bidQty;
        this._askPrice = json.askPrice;
        this._askQuantity = json.askQty;
    }
    get symbol() {
        return this._symbol;
    }
    set symbol(value) {
        this._symbol = value;
    }
    get bidPrice() {
        return this._bidPrice;
    }
    set bidPrice(value) {
        this._bidPrice = value;
    }
    get bidQuantity() {
        return this._bidQuantity;
    }
    set bidQuantity(value) {
        this._bidQuantity = value;
    }
    get askPrice() {
        return this._askPrice;
    }
    set askPrice(value) {
        this._askPrice = value;
    }
    get askQuantity() {
        return this._askQuantity;
    }
    set askQuantity(value) {
        this._askQuantity = value;
    }
}
exports.Ticker = Ticker;
//# sourceMappingURL=Ticker.js.map