"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotSizeFilter = void 0;
/**
 * Represents a single lot size filter.
 */
class LotSizeFilter {
    constructor(json) {
        this._minimumQuantity = json.minQty;
        this._maximumQuantity = json.maxQty;
        this._stepSize = json.stepSize;
    }
    get minimumQuantity() {
        return this._minimumQuantity;
    }
    set minimumQuantity(value) {
        this._minimumQuantity = value;
    }
    get maximumQuantity() {
        return this._maximumQuantity;
    }
    set maximumQuantity(value) {
        this._maximumQuantity = value;
    }
    get stepSize() {
        return this._stepSize;
    }
    set stepSize(value) {
        this._stepSize = value;
    }
}
exports.LotSizeFilter = LotSizeFilter;
//# sourceMappingURL=LotSizeFilter.js.map