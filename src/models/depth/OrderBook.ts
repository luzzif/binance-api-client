import { PlacedOrder } from "../order/PlacedOrder";

/**
 * Represents a single order book.
 */
export class OrderBook {
    private _bids: PlacedOrder[];
    private _asks: PlacedOrder[];

    constructor(json: any) {
        this._asks = [];
        for (const askJson of json.asks) {
            this._asks.push(new PlacedOrder(askJson));
        }

        this._bids = [];
        for (const bidJson of json.bids) {
            this._bids.push(new PlacedOrder(bidJson));
        }
    }

    get bids(): PlacedOrder[] {
        return this._bids;
    }

    set bids(value: PlacedOrder[]) {
        this._bids = value;
    }

    get asks(): PlacedOrder[] {
        return this._asks;
    }

    set asks(value: PlacedOrder[]) {
        this._asks = value;
    }
}
