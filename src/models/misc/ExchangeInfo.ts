import { RateLimit } from "../filter/RateLimit";
import { Symbol } from "./Symbol";
import { FilterType } from "../../enums/FilterType";
import { MaxOrdersFilter } from "../filter/MaxOrdersFilter";
import { MaxAlgoOrdersFilter } from "../filter/MaxAlgoOrdersFilter";
import { LotSizeFilter } from "../filter/LotSizeFilter";
import { MinimumNotionalFilter } from "../filter/MinimumNotionalFilter";
import { PriceFilter } from "../filter/PriceFilter";

/**
 * Represents a single exchange info.
 */
export class ExchangeInfo {

    private _timezone: string;
    private _serverTime: Date;
    private _rateLimits: RateLimit[];
    private _filters: ( LotSizeFilter | MaxAlgoOrdersFilter | MaxOrdersFilter | MinimumNotionalFilter | PriceFilter )[];
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

            let filter: ( LotSizeFilter | MaxAlgoOrdersFilter | MaxOrdersFilter | MinimumNotionalFilter | PriceFilter );
            switch( FilterType[ jsonFilter.filterType as keyof typeof FilterType ] ) {

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

    get filters(): ( LotSizeFilter | MaxAlgoOrdersFilter | MaxOrdersFilter | MinimumNotionalFilter | PriceFilter )[] {
        return this._filters;
    }

    set filters( value: ( LotSizeFilter | MaxAlgoOrdersFilter | MaxOrdersFilter | MinimumNotionalFilter | PriceFilter )[] ) {
        this._filters = value;
    }

    get symbols(): Symbol[] {
        return this._symbols;
    }

    set symbols( value: Symbol[] ) {
        this._symbols = value;
    }

}