"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPrice = void 0;
/**
 * Represents a single latest price for a particular symbol.
 */
class LatestPrice {
    constructor(json) {
        this._symbol = json.symbol;
        this._price = json.price;
    }
    get symbol() {
        return this._symbol;
    }
    set symbol(value) {
        this._symbol = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
}
exports.LatestPrice = LatestPrice;
//# sourceMappingURL=LatestPrice.js.map