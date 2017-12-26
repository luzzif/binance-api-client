/**
 * Represents a single maximum algo order number filter.
 */
import { Filter } from "./abstraction/Filter";

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