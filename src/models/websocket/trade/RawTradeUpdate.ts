/**
 * Represents a single raw trade update.
 */
export class RawTradeUpdate {

    private _timestamp: Date;
    private _symbol: string;
    private _tradeId: number;
    private _price: number;
    private _quantity: number;
    private _buyerOrderId: number;
    private _sellerOrderId: number;
    private _placedAt: Date;
    private _buyerMaker: boolean;

    constructor( json: any ) {

        this._timestamp = new Date( json.E );
        this._symbol = json.s;
        this._tradeId = json.t;
        this._price = parseFloat(json.p);
        this._quantity = parseFloat(json.q);
        this._buyerOrderId = json.b;
        this._sellerOrderId = json.a;
        this._placedAt = new Date( json.T );
        this._buyerMaker = json.m;

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

    get tradeId(): number {
        return this._tradeId;
    }

    set tradeId( value: number ) {
        this._tradeId = value;
    }

    get price(): number {
        return this._price;
    }

    set price( value: number ) {
        this._price = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity( value: number ) {
        this._quantity = value;
    }

    get buyerOrderId(): number {
        return this._buyerOrderId;
    }

    set buyerOrderId( value: number ) {
        this._buyerOrderId = value;
    }

    get sellerOrderId(): number {
        return this._sellerOrderId;
    }

    set sellerOrderId( value: number ) {
        this._sellerOrderId = value;
    }

    get placedAt(): Date {
        return this._placedAt;
    }

    set placedAt( value: Date ) {
        this._placedAt = value;
    }

    get buyerMaker(): boolean {
        return this._buyerMaker;
    }

    set buyerMaker( value: boolean ) {
        this._buyerMaker = value;
    }

}
