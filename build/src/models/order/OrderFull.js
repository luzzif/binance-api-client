"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderFull = void 0;
const OrderResult_1 = require("./OrderResult");
const PlacedOrderFill_1 = require("./PlacedOrderFill");
class OrderFull {
    constructor(json) {
        this._result = new OrderResult_1.OrderResult(json);
        this._fills = [];
        for (const jsonFill of json.fills) {
            this._fills.push(new PlacedOrderFill_1.PlacedOrderFill(jsonFill));
        }
    }
    get result() {
        return this._result;
    }
    set result(value) {
        this._result = value;
    }
    get fills() {
        return this._fills;
    }
    set fills(value) {
        this._fills = value;
    }
}
exports.OrderFull = OrderFull;
//# sourceMappingURL=OrderFull.js.map