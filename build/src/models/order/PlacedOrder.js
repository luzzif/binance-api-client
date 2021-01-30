"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacedOrder = void 0;
/**
 * Represents a single already placed order.
 */
class PlacedOrder {
    constructor(json) {
        this._price = json[0];
        this._quantity = json[1];
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
}
exports.PlacedOrder = PlacedOrder;
//# sourceMappingURL=PlacedOrder.js.map