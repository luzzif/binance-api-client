/**
 * Represents a single order book update.
 */
import { PlacedOrder } from "../../order/PlacedOrder";

export class OrderBookUpdate {

    private _timestamp: Date;
    private _id: number;
    private _asks: PlacedOrder[];
    private _bids: PlacedOrder[];

    constructor( json: any ) {

        this._timestamp = new Date( json.E );
        this._id = json.u;

        this._asks = [];
        for( let askJson of json.a ) {
            this._asks.push( new PlacedOrder( askJson ) );
        }

        this._bids = [];
        for( let bidJson of json.b ) {
            this._bids.push( new PlacedOrder( bidJson ) );
        }

    }

    get timestamp(): Date {
        return this._timestamp;
    }

    set timestamp( value: Date ) {
        this._timestamp = value;
    }

    get id(): number {
        return this._id;
    }

    set id( value: number ) {
        this._id = value;
    }

    get asks(): PlacedOrder[] {
        return this._asks;
    }

    set asks( value: PlacedOrder[] ) {
        this._asks = value;
    }

    get bids(): PlacedOrder[] {
        return this._bids;
    }

    set bids( value: PlacedOrder[] ) {
        this._bids = value;
    }

}