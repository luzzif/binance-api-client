import { OrderStatus } from "../../enums/OrderStatus";
import { TimeInForce } from "../../enums/TimeInForce";
import { OrderType } from "../../enums/OrderType";
import { OrderSide } from "../../enums/OrderSide";

/**
 * Represents a single open order.
 */
export class Order {

    private _symbol: string;
    private _id: number;
    private _clientId: string;
    private _price: number;
    private _originalQuantity: number;
    private _executedQuantity: number;
    private _status: OrderStatus;
    private _timeInForce: TimeInForce;
    private _type: OrderType;
    private _side: OrderSide;
    private _stopPrice: number;
    private _icebergQuantity: number;
    private _timestamp: Date;

    constructor( json: any ) {

        this._symbol = json.symbol;
        this._id = json.orderId;
        this._clientId = json.clientOrderId;
        this._price = json.price;
        this._originalQuantity = json.origQty;
        this._executedQuantity = json.executedQty;
        this._status = OrderStatus[ json.status as string ];
        this._timeInForce = TimeInForce[ json._timeInForce as string ];
        this._type = OrderType[ json.type as string ];
        this._side = OrderSide[ json._side as string ];
        this._stopPrice = json._stopPrice;
        this._icebergQuantity = json.icebergQty;
        this._timestamp = new Date( json.time );

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

    get price(): number {
        return this._price;
    }

    set price( value: number ) {
        this._price = value;
    }

    get originalQuantity(): number {
        return this._originalQuantity;
    }

    set originalQuantity( value: number ) {
        this._originalQuantity = value;
    }

    get executedQuantity(): number {
        return this._executedQuantity;
    }

    set executedQuantity( value: number ) {
        this._executedQuantity = value;
    }

    get status(): OrderStatus {
        return this._status;
    }

    set status( value: OrderStatus ) {
        this._status = value;
    }

    get timeInForce(): TimeInForce {
        return this._timeInForce;
    }

    set timeInForce( value: TimeInForce ) {
        this._timeInForce = value;
    }

    get type(): OrderType {
        return this._type;
    }

    set type( value: OrderType ) {
        this._type = value;
    }

    get side(): OrderSide {
        return this._side;
    }

    set side( value: OrderSide ) {
        this._side = value;
    }

    get stopPrice(): number {
        return this._stopPrice;
    }

    set stopPrice( value: number ) {
        this._stopPrice = value;
    }

    get icebergQuantity(): number {
        return this._icebergQuantity;
    }

    set icebergQuantity( value: number ) {
        this._icebergQuantity = value;
    }

    get timestamp(): Date {
        return this._timestamp;
    }

    set timestamp( value: Date ) {
        this._timestamp = value;
    }

}