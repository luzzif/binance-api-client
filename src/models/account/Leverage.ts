/**
 * Represents a single leverage of a specific symbol market
 */
export class Leverage {

    private _leverage: number;
    private _maxNotionalValue: number;
    private _symbol: string;


    constructor( json: any ) {

        this._leverage = json.leverage;
        this._maxNotionalValue = json.maxNotionalValue;
        this._symbol = json.symbol || json.l;

    }

    get leverage(): number {
        return this._leverage;
    }

    set leverage( value: number ) {
        this._leverage = value;
    }

    get maxNotionalValue(): number {
        return this._maxNotionalValue;
    }

    set maxNotionalValue( value: number ) {
        this._maxNotionalValue = value;
    }

    get symbol(): string {
        return this._symbol;
    }

    set symbol( value: string ) {
        this._symbol = value;
    }

}