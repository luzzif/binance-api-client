import { SymbolFilter } from "./abstraction/SymbolFilter";
import { ExchangeFilter } from "./abstraction/ExchangeFilter";

/**
 * Represents a single maximum algo order number filter.
 */
export class MaxAlgoOrdersFilter implements SymbolFilter, ExchangeFilter {

    private _value: number;

    constructor( json: any ) {
        this._value = json.limit;
    }

    get value(): number {
        return this._value;
    }

    set value( value: number ) {
        this._value = value;
    }

}