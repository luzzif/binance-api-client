/**
 * Represents a single trade.
 */
export class Trade {

    private _id: number;
    private _orderId: number;
    private _price: number;
    private _quantity: number;
    private _commission: number;
    private _commissionAsset: string;
    private _timestamp: Date;
    private _buyer: boolean;
    private _maker: boolean;
    private _bestMatch: boolean;

    constructor( json: any ) {

        this._id = json.id;
        this._orderId = json.orderId;
        this._price = parseFloat(json.price);
        this._quantity = parseFloat(json.qty);
        this._commission = parseFloat(json.commission);
        this._commissionAsset = json.commissionAsset;
        this._timestamp = new Date( json.time );
        this._buyer = json.isBuyer;
        this._maker = json.isMaker;
        this._bestMatch = json.isBestMatch;

    }

    get id(): number {
        return this._id;
    }

    set id( value: number ) {
        this._id = value;
    }

    get orderId(): number {
        return this._orderId;
    }

    set orderId( value: number ) {
        this._orderId = value;
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

    get commission(): number {
        return this._commission;
    }

    set commission( value: number ) {
        this._commission = value;
    }

    get commissionAsset(): string {
        return this._commissionAsset;
    }

    set commissionAsset( value: string ) {
        this._commissionAsset = value;
    }

    get timestamp(): Date {
        return this._timestamp;
    }

    set timestamp( value: Date ) {
        this._timestamp = value;
    }

    get buyer(): boolean {
        return this._buyer;
    }

    set buyer( value: boolean ) {
        this._buyer = value;
    }

    get maker(): boolean {
        return this._maker;
    }

    set maker( value: boolean ) {
        this._maker = value;
    }

    get bestMatch(): boolean {
        return this._bestMatch;
    }

    set bestMatch( value: boolean ) {
        this._bestMatch = value;
    }

}