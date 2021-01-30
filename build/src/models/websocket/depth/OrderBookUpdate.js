"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderBookUpdate = void 0;
const PlacedOrder_1 = require("../../order/PlacedOrder");
/**
 * Represents a single order book update.
 */
class OrderBookUpdate {
    constructor(json) {
        this._timestamp = new Date(json.E);
        this._symbol = json.s;
        this._id = json.u;
        this._asks = [];
        for (const askJson of json.a) {
            this._asks.push(new PlacedOrder_1.PlacedOrder(askJson));
        }
        this._bids = [];
        for (const bidJson of json.b) {
            this._bids.push(new PlacedOrder_1.PlacedOrder(bidJson));
        }
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
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get asks() {
        return this._asks;
    }
    set asks(value) {
        this._asks = value;
    }
    get bids() {
        return this._bids;
    }
    set bids(value) {
        this._bids = value;
    }
}
exports.OrderBookUpdate = OrderBookUpdate;
//# sourceMappingURL=OrderBookUpdate.js.map