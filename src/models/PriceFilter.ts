/**
 * Represents a single price filter.
 */
export class PriceFilter {

    private _minimumPrice: number;
    private _maximumPrice: number;
    private _tickSize: number;

    constructor( json: any ) {

        this._minimumPrice = json.minPrice;
        this._maximumPrice = json.maxPrice;
        this._tickSize = json._tickSize;

    }

    get minimumPrice(): number {
        return this._minimumPrice;
    }

    set minimumPrice( value: number ) {
        this._minimumPrice = value;
    }

    get maximumPrice(): number {
        return this._maximumPrice;
    }

    set maximumPrice( value: number ) {
        this._maximumPrice = value;
    }

    get tickSize(): number {
        return this._tickSize;
    }

    set tickSize( value: number ) {
        this._tickSize = value;
    }

}