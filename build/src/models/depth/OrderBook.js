"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderBook = void 0;
const PlacedOrder_1 = require("../order/PlacedOrder");
/**
 * Represents a single order book.
 */
class OrderBook {
    constructor(json) {
        this._asks = [];
        for (const askJson of json.asks) {
            this._asks.push(new PlacedOrder_1.PlacedOrder(askJson));
        }
        this._bids = [];
        for (const bidJson of json.bids) {
            this._bids.push(new PlacedOrder_1.PlacedOrder(bidJson));
        }
    }
    get bids() {
        return this._bids;
    }
    set bids(value) {
        this._bids = value;
    }
    get asks() {
        return this._asks;
    }
    set asks(value) {
        this._asks = value;
    }
}
exports.OrderBook = OrderBook;
//# sourceMappingURL=OrderBook.js.map