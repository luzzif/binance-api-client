"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceFilter = void 0;
/**
 * Represents a single price filter.
 */
class PriceFilter {
    constructor(json) {
        this._minimumPrice = json.minPrice;
        this._maximumPrice = json.maxPrice;
        this._tickSize = json.tickSize;
    }
    get minimumPrice() {
        return this._minimumPrice;
    }
    set minimumPrice(value) {
        this._minimumPrice = value;
    }
    get maximumPrice() {
        return this._maximumPrice;
    }
    set maximumPrice(value) {
        this._maximumPrice = value;
    }
    get tickSize() {
        return this._tickSize;
    }
    set tickSize(value) {
        this._tickSize = value;
    }
}
exports.PriceFilter = PriceFilter;
//# sourceMappingURL=PriceFilter.js.map