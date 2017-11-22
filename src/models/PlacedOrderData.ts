/**
 * Represents a single placed order data.
 */
export class PlacedOrderData {

    private _symbol: string;
    private _id: number;
    private _clientId: string;
    private _timestamp: Date;

    constructor( json: any ) {

        this._symbol = json.symbol;
        this._id = json.orderId;
        this._clientId = json.clientOrderId;
        this._timestamp = new Date( json.transactTime );

    }

    get symbol(): string {
        return this._symbol;
    }

    set symbol( value: string ) {
        this._symbol = value;
    }

    get id(): number {
        return this._id;
    }

    set id( value: number ) {
        this._id = value;
    }

    get clientId(): string {
        return this._clientId;
    }

    set clientId( value: string ) {
        this._clientId = value;
    }

    get timestamp(): Date {
        return this._timestamp;
    }

    set timestamp( value: Date ) {
        this._timestamp = value;
    }

}