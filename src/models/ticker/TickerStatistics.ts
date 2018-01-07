/**
 * Represents a single 24-hr ticker statistics collection.
 */
export class TickerStatistics {

    private _priceChange: number;
    private _priceChangePercentage: number;
    private _weightedAveragePrice: number;
    private _previousClosurePrice: number;
    private _lastPrice: number;
    private _bidPrice: number;
    private _askPrice: number;
    private _openingPrice: number;
    private _highestPrice: number;
    private _lowestPrice: number;
    private _volume: number;
    private _openingTime: Date;
    private _closureTime: Date;
    private _firstTradeId: number;
    private _lastTradeId: number;
    private _tradesCount: number;

    constructor( json: any ) {

        this._priceChange = json.priceChange;
        this._priceChangePercentage = json.priceChangePercent;
        this._weightedAveragePrice = json.weightedAvgPrice;
        this._previousClosurePrice = json.prevClosePrice;
        this._lastPrice = json.lastPrice;
        this._bidPrice = json.bidPrice;
        this._askPrice = json.askPrice;
        this._openingPrice = json.openPrice;
        this._highestPrice = json.highPrice;
        this._lowestPrice = json.lowPrice;
        this._volume = json.volume;
        this._openingTime = new Date( json.openTime );
        this._closureTime = new Date( json.closeTime );
        this._firstTradeId = json.firstId;
        this._lastTradeId = json.lastId;
        this._tradesCount = json.count;

    }

    get priceChange(): number {
        return this._priceChange;
    }

    set priceChange( value: number ) {
        this._priceChange = value;
    }

    get priceChangePercentage(): number {
        return this._priceChangePercentage;
    }

    set priceChangePercentage( value: number ) {
        this._priceChangePercentage = value;
    }

    get weightedAveragePrice(): number {
        return this._weightedAveragePrice;
    }

    set weightedAveragePrice( value: number ) {
        this._weightedAveragePrice = value;
    }

    get previousClosurePrice(): number {
        return this._previousClosurePrice;
    }

    set previousClosurePrice( value: number ) {
        this._previousClosurePrice = value;
    }

    get lastPrice(): number {
        return this._lastPrice;
    }

    set lastPrice( value: number ) {
        this._lastPrice = value;
    }

    get bidPrice(): number {
        return this._bidPrice;
    }

    set bidPrice( value: number ) {
        this._bidPrice = value;
    }

    get askPrice(): number {
        return this._askPrice;
    }

    set askPrice( value: number ) {
        this._askPrice = value;
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

    get volume(): number {
        return this._volume;
    }

    set volume( value: number ) {
        this._volume = value;
    }

    get openingTime(): Date {
        return this._openingTime;
    }

    set openingTime( value: Date ) {
        this._openingTime = value;
    }

    get closureTime(): Date {
        return this._closureTime;
    }

    set closureTime( value: Date ) {
        this._closureTime = value;
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

    get tradesCount(): number {
        return this._tradesCount;
    }

    set tradesCount( value: number ) {
        this._tradesCount = value;
    }

}