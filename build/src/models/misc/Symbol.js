"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Symbol = void 0;
const SymbolStatus_1 = require("../../enums/SymbolStatus");
const OrderType_1 = require("../../enums/OrderType");
const PriceFilter_1 = require("../filter/PriceFilter");
const FilterType_1 = require("../../enums/FilterType");
const LotSizeFilter_1 = require("../filter/LotSizeFilter");
const MinimumNotionalFilter_1 = require("../filter/MinimumNotionalFilter");
const MaxOrdersFilter_1 = require("../filter/MaxOrdersFilter");
const MaxAlgoOrdersFilter_1 = require("../filter/MaxAlgoOrdersFilter");
/**
 * Represents a single symbol.
 */
class Symbol {
    constructor(json) {
        this._name = json.symbol;
        this._status = SymbolStatus_1.SymbolStatus[json.status];
        this._baseAsset = json.baseAsset;
        this._baseAssetPrecision = json.baseAssetPrecision;
        this._quoteAsset = json.quoteAsset;
        this._quoteAssetPrecision = json.quotePrecision;
        this._icebergAllowed = json.icebergAllowed;
        this._orderTypes = [];
        for (const orderType of json.orderTypes) {
            this._orderTypes.push(OrderType_1.OrderType[orderType]);
        }
        this._filters = [];
        for (const jsonFilter of json.filters) {
            let filter;
            switch (FilterType_1.FilterType[jsonFilter.filterType]) {
                case FilterType_1.FilterType.PRICE_FILTER: {
                    filter = new PriceFilter_1.PriceFilter(jsonFilter);
                    break;
                }
                case FilterType_1.FilterType.LOT_SIZE: {
                    filter = new LotSizeFilter_1.LotSizeFilter(jsonFilter);
                    break;
                }
                case FilterType_1.FilterType.MIN_NOTIONAL: {
                    filter = new MinimumNotionalFilter_1.MinimumNotionalFilter(jsonFilter);
                    break;
                }
                case FilterType_1.FilterType.MAX_NUM_ORDERS: {
                    filter = new MaxOrdersFilter_1.MaxOrdersFilter(jsonFilter);
                    break;
                }
                case FilterType_1.FilterType.MAX_ALGO_ORDERS: {
                    filter = new MaxAlgoOrdersFilter_1.MaxAlgoOrdersFilter(jsonFilter);
                    break;
                }
            }
            this._filters.push(filter);
        }
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get baseAsset() {
        return this._baseAsset;
    }
    set baseAsset(value) {
        this._baseAsset = value;
    }
    get baseAssetPrecision() {
        return this._baseAssetPrecision;
    }
    set baseAssetPrecision(value) {
        this._baseAssetPrecision = value;
    }
    get quoteAsset() {
        return this._quoteAsset;
    }
    set quoteAsset(value) {
        this._quoteAsset = value;
    }
    get quoteAssetPrecision() {
        return this._quoteAssetPrecision;
    }
    set quoteAssetPrecision(value) {
        this._quoteAssetPrecision = value;
    }
    get orderTypes() {
        return this._orderTypes;
    }
    set orderTypes(value) {
        this._orderTypes = value;
    }
    get icebergAllowed() {
        return this._icebergAllowed;
    }
    set icebergAllowed(value) {
        this._icebergAllowed = value;
    }
    get filters() {
        return this._filters;
    }
    set filters(value) {
        this._filters = value;
    }
}
exports.Symbol = Symbol;
//# sourceMappingURL=Symbol.js.map