"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeUpdate = void 0;
/**
 * Represents a single trade update.
 */
class TradeUpdate {
    constructor(json) {
        this._timestamp = new Date(json.E);
        this._symbol = json.s;
        this._aggregatedId = json.a;
        this._price = json.p;
        this._quantity = json.q;
        this._firstBreakdownId = json.f;
        this._lastBreakdownId = json.l;
        this._placedAt = new Date(json.T);
        this._buyerMaker = json.m;
    }
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
    get symbol() {
        return this._symbol;
    }
    set symbol(value) {
        this._symbol = value;
    }
    get aggregatedId() {
        return this._aggregatedId;
    }
    set aggregatedId(value) {
        this._aggregatedId = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(value) {
        this._quantity = value;
    }
    get firstBreakdownId() {
        return this._firstBreakdownId;
    }
    set firstBreakdownId(value) {
        this._firstBreakdownId = value;
    }
    get lastBreakdownId() {
        return this._lastBreakdownId;
    }
    set lastBreakdownId(value) {
        this._lastBreakdownId = value;
    }
    get placedAt() {
        return this._placedAt;
    }
    set placedAt(value) {
        this._placedAt = value;
    }
    get buyerMaker() {
        return this._buyerMaker;
    }
    set buyerMaker(value) {
        this._buyerMaker = value;
    }
}
exports.TradeUpdate = TradeUpdate;
//# sourceMappingURL=TradeUpdate.js.map