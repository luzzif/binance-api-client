import { SymbolFilter } from "./abstraction/SymbolFilter";

/**
 * Represents a single minimum notional filter.
 */
export class MinimumNotionalFilter implements SymbolFilter {

    private _value: number;

    constructor( json: any ) {
        this._value = parseFloat(json.minNotional);
    }

    get value(): number {
        return this._value;
    }

    set value( value: number ) {
        this._value = value;
    }

}