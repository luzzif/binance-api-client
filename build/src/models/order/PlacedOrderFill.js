"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacedOrderFill = void 0;
/**
 * Represents a single placed order fill.
 */
class PlacedOrderFill {
    constructor(json) {
        this._quantity = json.qty;
        this._price = json.price;
        this._commission = json.commission;
        this._commissionAsset = json.commissionAsset;
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
    get commission() {
        return this._commission;
    }
    set commission(value) {
        this._commission = value;
    }
    get commissionAsset() {
        return this._commissionAsset;
    }
    set commissionAsset(value) {
        this._commissionAsset = value;
    }
}
exports.PlacedOrderFill = PlacedOrderFill;
//# sourceMappingURL=PlacedOrderFill.js.map