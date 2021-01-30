"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxOrdersFilter = void 0;
/**
 * Represents a single maximum order number filter.
 */
class MaxOrdersFilter {
    constructor(json) {
        this._value = json.limit;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
}
exports.MaxOrdersFilter = MaxOrdersFilter;
//# sourceMappingURL=MaxOrdersFilter.js.map