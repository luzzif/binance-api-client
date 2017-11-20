import { Order } from "./Order";

export class OrderBook {

    private _bids: Order[];
    private _asks: Order[];

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