"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxAlgoOrdersFilter = void 0;
/**
 * Represents a single maximum algo order number filter.
 */
class MaxAlgoOrdersFilter {
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
exports.MaxAlgoOrdersFilter = MaxAlgoOrdersFilter;
//# sourceMappingURL=MaxAlgoOrdersFilter.js.map