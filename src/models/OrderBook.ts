import { Order } from "./Order";
import { PlacedOrder } from "./PlacedOrder";

export class OrderBook {

    private _bids: PlacedOrder[];
    private _asks: PlacedOrder[];

    constructor( json: any ) {

        this._asks = [];
        for( let askJson of json.asks ) {
            this._asks.push( new Order( askJson ) );
        }

        this._bids = [];
        for( let bidJson of json.bids ) {
            this._bids.push( new Order( bidJson ) );
        }

    }

    get bids(): Order[] {
        return this._bids;
    }

    set bids( value: Order[] ) {
        this._bids = value;
    }

    get asks(): Order[] {
        return this._asks;
    }

    set asks( value: Order[] ) {
        this._asks = value;
    }

}