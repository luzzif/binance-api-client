/**
 * Represents a single canceled order data.
 */
export class CanceledOrderData {

    private _symbol: string;
    private _id: number;
    private _oldclientId: string;
    private _clientId: string;

    constructor( json: any ) {

        this._symbol = json.symbol;
        this._id = json.orderId;
        this._oldclientId = json.origClientOrderId;
        this._clientId = json.clientOrderId;

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

    get oldclientId(): string {
        return this._oldclientId;
    }

    set oldclientId( value: string ) {
        this._oldclientId = value;
    }

    get clientId(): string {
        return this._clientId;
    }

    set clientId( value: string ) {
        this._clientId = value;
    }

}