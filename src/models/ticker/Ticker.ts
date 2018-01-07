/**
 * Represents a single ticker.
 */
export class Ticker {

    private _symbol: string;
    private _bidPrice: number;
    private _bidQuantity: number;
    private _askPrice: number;
    private _askQuantity: number;

    constructor( json: any ) {

        this._symbol = json.symbol;
        this._bidPrice = json.bidPrice;
        this._bidQuantity = json.bidQty;
        this._askPrice = json.askPrice;
        this._askQuantity = json.askQty;

    }

    get symbol(): string {
        return this._symbol;
    }

    set symbol( value: string ) {
        this._symbol = value;
    }

    get bidPrice(): number {
        return this._bidPrice;
    }

    set bidPrice( value: number ) {
        this._bidPrice = value;
    }

    get bidQuantity(): number {
        return this._bidQuantity;
    }

    set bidQuantity( value: number ) {
        this._bidQuantity = value;
    }

    get askPrice(): number {
        return this._askPrice;
    }

    set askPrice( value: number ) {
        this._askPrice = value;
    }

    get askQuantity(): number {
        return this._askQuantity;
    }

    set askQuantity( value: number ) {
        this._askQuantity = value;
    }

}