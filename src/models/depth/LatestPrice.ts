/**
 * Represents a single latest price for a particular symbol.
 */
export class LatestPrice {

    private _symbol: string;
    private _price: number;

    constructor( json: any ) {
        this._symbol = json.symbol;
        this._price = parseFloat(json.price);
    }

    get symbol(): string {
        return this._symbol;
    }

    set symbol( value: string ) {
        this._symbol = value;
    }

    get price(): number {
        return this._price;
    }

    set price( value: number ) {
        this._price = value;
    }

}