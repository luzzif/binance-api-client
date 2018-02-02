import { RateLimitType } from "../../enums/RateLimitType";
import { RateLimitInterval } from "../../enums/RateLimitInterval";

export class RateLimit {

    private _type: RateLimitType;
    private _interval: RateLimitInterval;
    private _value: number;

    constructor( json: any ) {

        this._type = RateLimitType[ json.rateLimitType as string ];
        this._interval = RateLimitInterval[ json.interval as string ];
        this._value = json.limit;

    }

    get type(): RateLimitType {
        return this._type;
    }

    set type( value: RateLimitType ) {
        this._type = value;
    }

    get interval(): RateLimitInterval {
        return this._interval;
    }

    set interval( value: RateLimitInterval ) {
        this._interval = value;
    }

    get value(): number {
        return this._value;
    }

    set value( value: number ) {
        this._value = value;
    }

}