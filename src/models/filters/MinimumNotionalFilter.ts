import { Filter } from "./abstraction/Filter";

/**
 * Represents a single minimum notional filter.
 */
export class MinimumNotionalFilter implements Filter {

    private _value: number;

    constructor( json: any ) {
        this._value = json.minNotional;
    }

    get value(): number {
        return this._value;
    }

    set value( value: number ) {
        this._value = value;
    }

}