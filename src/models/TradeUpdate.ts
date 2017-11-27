/**
 * Represents a single trade update.
 */
export class TradeUpdate {

    private _timestamp: Date;
    private _symbol: string;
    private _aggregatedId: number;
    private _price: number;
    private _quantity: number;
    private _firstBreakdownId: number;
    private _lastBreakdownId: number;
    private _placedAt: Date;
    private _buyerMaker: boolean;

    constructor( json: any ) {

        this._timestamp = new Date( json.E );
        this._symbol = json.s;
        this._aggregatedId = json.a;
        this._price = json.p;
        this._quantity = json.q;
        this._firstBreakdownId = json.f;
        this._lastBreakdownId = json.l;
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

    get aggregatedId(): number {
        return this._aggregatedId;
    }

    set aggregatedId( value: number ) {
        this._aggregatedId = value;
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

    get firstBreakdownId(): number {
        return this._firstBreakdownId;
    }

    set firstBreakdownId( value: number ) {
        this._firstBreakdownId = value;
    }

    get lastBreakdownId(): number {
        return this._lastBreakdownId;
    }

    set lastBreakdownId( value: number ) {
        this._lastBreakdownId = value;
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