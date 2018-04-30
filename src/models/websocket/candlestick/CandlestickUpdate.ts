import { CandlestickInterval } from "../../../enums/CandlestickInterval";

/**
 * Represents a single candlestick update.
 */
export class CandlestickUpdate {

    private _timestamp: Date;
    private _symbol: string;
    private _openingTime: Date;
    private _openingPrice: number;
    private _highestPrice: number;
    private _lowestPrice: number;
    private _closurePrice: number;
    private _baseAssetVolume: number;
    private _closureTime: Date;
    private _quoteAssetVolume: number;
    private _tradesCount: number;
    private _boughtBaseAssetVolume: number;
    private _boughtQuoteAssetVolume: number;
    private _firstTradeId: number;
    private _lastTradeId: number;
    private _interval: CandlestickInterval;
    private _final: boolean;
    private _activeBuyVolume: number;

    constructor( json: any ) {

        this._timestamp = new Date( json.E );
        this._symbol = json.s;
        this._openingTime = new Date( json.k.t );
        this._openingPrice = parseFloat(json.k.o);
        this._highestPrice = parseFloat(json.k.h);
        this._lowestPrice = parseFloat(json.k.l);
        this._closurePrice = parseFloat(json.k.c);
        this._baseAssetVolume = parseFloat(json.k.v);
        this._closureTime = new Date( json.k.T );
        this._quoteAssetVolume = parseFloat(json.k.q);
        this._tradesCount = json.k.n;
        this._boughtBaseAssetVolume = parseFloat(json.k.V);
        this._boughtQuoteAssetVolume = parseFloat(json.k.Q);
        this._firstTradeId = json.k.f;
        this._lastTradeId = json.k.L;
        this._interval = json.k.i;
        this._final = json.k.x;
        this._activeBuyVolume = parseFloat(json.k.V);

    }

    get timestamp(): Date {
        return this._timestamp;
    }

    set timestamp( value: Date ) {
        this._timestamp = value;
    }

    get symbol(): string {
        return this._symbol;
    }

    set symbol( value: string ) {
        this._symbol = value;
    }

    get openingTime(): Date {
        return this._openingTime;
    }

    set openingTime( value: Date ) {
        this._openingTime = value;
    }

    get openingPrice(): number {
        return this._openingPrice;
    }

    set openingPrice( value: number ) {
        this._openingPrice = value;
    }

    get highestPrice(): number {
        return this._highestPrice;
    }

    set highestPrice( value: number ) {
        this._highestPrice = value;
    }

    get lowestPrice(): number {
        return this._lowestPrice;
    }

    set lowestPrice( value: number ) {
        this._lowestPrice = value;
    }

    get closurePrice(): number {
        return this._closurePrice;
    }

    set closurePrice( value: number ) {
        this._closurePrice = value;
    }

    get baseAssetVolume(): number {
        return this._baseAssetVolume;
    }

    set baseAssetVolume( value: number ) {
        this._baseAssetVolume = value;
    }

    get closureTime(): Date {
        return this._closureTime;
    }

    set closureTime( value: Date ) {
        this._closureTime = value;
    }

    get quoteAssetVolume(): number {
        return this._quoteAssetVolume;
    }

    set quoteAssetVolume( value: number ) {
        this._quoteAssetVolume = value;
    }

    get tradesCount(): number {
        return this._tradesCount;
    }

    set tradesCount( value: number ) {
        this._tradesCount = value;
    }

    get boughtBaseAssetVolume(): number {
        return this._boughtBaseAssetVolume;
    }

    set boughtBaseAssetVolume( value: number ) {
        this._boughtBaseAssetVolume = value;
    }

    get boughtQuoteAssetVolume(): number {
        return this._boughtQuoteAssetVolume;
    }

    set boughtQuoteAssetVolume( value: number ) {
        this._boughtQuoteAssetVolume = value;
    }

    get firstTradeId(): number {
        return this._firstTradeId;
    }

    set firstTradeId( value: number ) {
        this._firstTradeId = value;
    }

    get lastTradeId(): number {
        return this._lastTradeId;
    }

    set lastTradeId( value: number ) {
        this._lastTradeId = value;
    }

    get interval(): CandlestickInterval {
        return this._interval;
    }

    set interval( value: CandlestickInterval ) {
        this._interval = value;
    }

    get final(): boolean {
        return this._final;
    }

    set final( value: boolean ) {
        this._final = value;
    }

    get activeBuyVolume(): number {
        return this._activeBuyVolume;
    }

    set activeBuyVolume( value: number ) {
        this._activeBuyVolume = value;
    }

}