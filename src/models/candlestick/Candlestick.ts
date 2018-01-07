/**
 * Represents a single candlestick.
 */
export class Candlestick {

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

    constructor( json: any ) {

        this._openingTime = new Date( json[ 0 ] );
        this._openingPrice = json[ 1 ];
        this._highestPrice = json[ 2 ];
        this._lowestPrice = json[ 3 ];
        this._closurePrice = json[ 4 ];
        this._baseAssetVolume = json[ 5 ];
        this._closureTime = new Date( json[ 6 ] );
        this._quoteAssetVolume = json[ 7 ];
        this._tradesCount = json[ 8 ];
        this._boughtBaseAssetVolume = json[ 9 ];
        this._boughtQuoteAssetVolume = json[ 10 ];

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

}