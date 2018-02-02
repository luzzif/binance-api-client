import { Filter } from "./abstraction/Filter";

/**
 * Represents a single maximum symbol algo order number filter.
 */
export class MaxAlgoOrdersFilter implements Filter {

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