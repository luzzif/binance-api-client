"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimumNotionalFilter = void 0;
/**
 * Represents a single minimum notional filter.
 */
class MinimumNotionalFilter {
    constructor(json) {
        this._value = json.minNotional;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
}
exports.MinimumNotionalFilter = MinimumNotionalFilter;
//# sourceMappingURL=MinimumNotionalFilter.js.map