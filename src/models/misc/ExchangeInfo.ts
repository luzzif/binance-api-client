import { RateLimit } from "../filter/RateLimit";
import { Symbol } from "./Symbol";
import { FilterType } from "../../enums/FilterType";
import { ExchangeFilter } from "../filter/abstraction/ExchangeFilter";
import { MaxOrdersFilter } from "../filter/MaxOrdersFilter";
import { MaxAlgoOrdersFilter } from "../filter/MaxAlgoOrdersFilter";

/**
 * Represents a single exchange info.
 */
export class ExchangeInfo {
    private _timezone: string;
    private _serverTime: Date;
    private _rateLimits: RateLimit[];
    private _filters: ExchangeFilter[];
    private _symbols: Symbol[];

    constructor(json: any) {
        this._timezone = json.timezone;
        this._serverTime = new Date(json.serverTime);

        this._rateLimits = [];
        for (const jsonRateLimit of json.rateLimits) {
            this._rateLimits.push(new RateLimit(jsonRateLimit));
        }

        this._filters = [];
        for (const jsonFilter of json.exchangeFilters) {
            let filter: ExchangeFilter;
            switch (FilterType[jsonFilter.filterType as string]) {
                case FilterType.EXCHANGE_MAX_NUM_ORDERS: {
                    filter = new MaxOrdersFilter(jsonFilter);
                    break;
                }
                case FilterType.EXCHANGE_MAX_ALGO_ORDERS: {
                    filter = new MaxAlgoOrdersFilter(jsonFilter);
                    break;
                }
                default: {
                    filter = null;
                }
            }
            this._filters.push(filter);
        }

        this._symbols = [];
        for (const jsonSymbol of json.symbols) {
            this._symbols.push(new Symbol(jsonSymbol));
        }
    }

    get timezone(): string {
        return this._timezone;
    }

    set timezone(value: string) {
        this._timezone = value;
    }

    get serverTime(): Date {
        return this._serverTime;
    }

    set serverTime(value: Date) {
        this._serverTime = value;
    }

    get rateLimits(): RateLimit[] {
        return this._rateLimits;
    }

    set rateLimits(value: RateLimit[]) {
        this._rateLimits = value;
    }

    get filters(): ExchangeFilter[] {
        return this._filters;
    }

    set filters(value: ExchangeFilter[]) {
        this._filters = value;
    }

    get symbols(): Symbol[] {
        return this._symbols;
    }

    set symbols(value: Symbol[]) {
        this._symbols = value;
    }
}
