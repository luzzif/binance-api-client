import { RateLimit } from "./RateLimit";
import { Symbol } from "./Symbol";
import { Filter } from "./filters/abstraction/Filter";
import { FilterType } from "../enums/FilterType";
import { MaxOrdersFilter } from "./filters/MaxOrdersFilter";
import { MaxAlgoOrdersFilter } from "./filters/MaxAlgoOrdersFilter";

/**
 * Represents a single exchange info.
 */
export class ExchangeInfo {

    private _timezone: string;
    private _serverTime: Date;
    private _rateLimits: RateLimit[];
    private _filters: Filter[];
    private _symbols: Symbol[];

    constructor( json: any ) {

        this._timezone = json.timezone;
        this._serverTime = new Date( json.serverTime );

        this._rateLimits = [];
        for( let jsonRateLimit of json.rateLimits ) {
            this._rateLimits.push( new RateLimit( jsonRateLimit ) );
        }

        this._filters = [];
        for( let jsonFilter of json.exchangeFilters ) {

            let filter: Filter;
            switch( FilterType[ jsonFilter.filterType as string ] ) {

                case FilterType.EXCHANGE_MAX_NUM_ORDERS: {
                    filter = new MaxOrdersFilter( jsonFilter );
                    break;
                }
                case FilterType.EXCHANGE_MAX_ALGO_ORDERS: {
                    filter = new MaxAlgoOrdersFilter( jsonFilter );
                    break;
                }

            }
            this._filters.push( filter );

        }

        this._symbols = [];
        for( let jsonSymbol of json.symbols ) {
            this._symbols.push( new Symbol( jsonSymbol ) );
        }

    }

    get timezone(): string {
        return this._timezone;
    }

    set timezone( value: string ) {
        this._timezone = value;
    }

    get serverTime(): Date {
        return this._serverTime;
    }

    set serverTime( value: Date ) {
        this._serverTime = value;
    }

    get rateLimits(): RateLimit[] {
        return this._rateLimits;
    }

    set rateLimits( value: RateLimit[] ) {
        this._rateLimits = value;
    }

    get filters(): Filter[] {
        return this._filters;
    }

    set filters( value: Filter[] ) {
        this._filters = value;
    }

    get symbols(): Symbol[] {
        return this._symbols;
    }

    set symbols( value: Symbol[] ) {
        this._symbols = value;
    }

}