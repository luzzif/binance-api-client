"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterType = void 0;
/**
 * Represents a single filter type.
 */
var FilterType;
(function (FilterType) {
    FilterType[FilterType["PRICE_FILTER"] = 0] = "PRICE_FILTER";
    FilterType[FilterType["LOT_SIZE"] = 1] = "LOT_SIZE";
    FilterType[FilterType["MIN_NOTIONAL"] = 2] = "MIN_NOTIONAL";
    FilterType[FilterType["MAX_NUM_ORDERS"] = 3] = "MAX_NUM_ORDERS";
    FilterType[FilterType["MAX_ALGO_ORDERS"] = 4] = "MAX_ALGO_ORDERS";
    FilterType[FilterType["EXCHANGE_MAX_NUM_ORDERS"] = 5] = "EXCHANGE_MAX_NUM_ORDERS";
    FilterType[FilterType["EXCHANGE_MAX_ALGO_ORDERS"] = 6] = "EXCHANGE_MAX_ALGO_ORDERS";
})(FilterType = exports.FilterType || (exports.FilterType = {}));
//# sourceMappingURL=FilterType.js.map