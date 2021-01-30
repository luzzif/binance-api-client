"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeInfo = void 0;
const RateLimit_1 = require("../filter/RateLimit");
const Symbol_1 = require("./Symbol");
const FilterType_1 = require("../../enums/FilterType");
const MaxOrdersFilter_1 = require("../filter/MaxOrdersFilter");
const MaxAlgoOrdersFilter_1 = require("../filter/MaxAlgoOrdersFilter");
/**
 * Represents a single exchange info.
 */
class ExchangeInfo {
    constructor(json) {
        this._timezone = json.timezone;
        this._serverTime = new Date(json.serverTime);
        this._rateLimits = [];
        for (const jsonRateLimit of json.rateLimits) {
            this._rateLimits.push(new RateLimit_1.RateLimit(jsonRateLimit));
        }
        this._filters = [];
        for (const jsonFilter of json.exchangeFilters) {
            let filter;
            switch (FilterType_1.FilterType[jsonFilter.filterType]) {
                case FilterType_1.FilterType.EXCHANGE_MAX_NUM_ORDERS: {
                    filter = new MaxOrdersFilter_1.MaxOrdersFilter(jsonFilter);
                    break;
                }
                case FilterType_1.FilterType.EXCHANGE_MAX_ALGO_ORDERS: {
                    filter = new MaxAlgoOrdersFilter_1.MaxAlgoOrdersFilter(jsonFilter);
                    break;
                }
                default: {
                    filter = null;
                }
            }
            this._filters.push(filter);
        }
        this._symbols = [];
        for (const jsonSymbol of json.symbols) {
            this._symbols.push(new Symbol_1.Symbol(jsonSymbol));
        }
    }
    get timezone() {
        return this._timezone;
    }
    set timezone(value) {
        this._timezone = value;
    }
    get serverTime() {
        return this._serverTime;
    }
    set serverTime(value) {
        this._serverTime = value;
    }
    get rateLimits() {
        return this._rateLimits;
    }
    set rateLimits(value) {
        this._rateLimits = value;
    }
    get filters() {
        return this._filters;
    }
    set filters(value) {
        this._filters = value;
    }
    get symbols() {
        return this._symbols;
    }
    set symbols(value) {
        this._symbols = value;
    }
}
exports.ExchangeInfo = ExchangeInfo;
//# sourceMappingURL=ExchangeInfo.js.map