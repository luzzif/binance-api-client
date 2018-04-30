import { OrderStatus } from "../../enums/OrderStatus";
import { TimeInForce } from "../../enums/TimeInForce";
import { OrderType } from "../../enums/OrderType";
import { OrderSide } from "../../enums/OrderSide";
import { FilterType } from "../../enums/FilterType";

export class OrderResult {

    private _symbol: string;
    private _orderId: number;
    private _clientOrderId: string;
    private _timestamp: Date;
    private _price: number;
    private _originalQuantity: string;
    private _executedQuantity: string;
    private _status: OrderStatus;
    private _timeInForce: TimeInForce;
    private _type: OrderType;
    private _side: OrderSide;

    constructor( json: any ) {

        this._symbol = json.symbol;
        this._orderId = json.orderId;
        this._clientOrderId = json.clientOrderId;
        this._timestamp = new Date( json.transactTime );
        this._price = parseFloat(json.price);
        this._originalQuantity = parseFloat(json.origQty);
        this._executedQuantity = parseFloat(json.executedQty);
        this._status = OrderStatus[ json.status as keyof typeof OrderStatus ];
        this._timeInForce = TimeInForce[ json.timeInForce as keyof typeof TimeInForce ];
        this._type = OrderType[ json.type as keyof typeof OrderType ];
        this._side = OrderSide[ json.side as keyof typeof OrderSide ];

    }

    get symbol(): string {
        return this._symbol;
    }

    set symbol( value: string ) {
        this._symbol = value;
    }

    get orderId(): number {
        return this._orderId;
    }

    set orderId( value: number ) {
        this._orderId = value;
    }

    get clientOrderId(): string {
        return this._clientOrderId;
    }

    set clientOrderId( value: string ) {
        this._clientOrderId = value;
    }

    get timestamp(): Date {
        return this._timestamp;
    }

    set timestamp( value: Date ) {
        this._timestamp = value;
    }

    get price(): number {
        return this._price;
    }

    set price( value: number ) {
        this._price = value;
    }

    get originalQuantity(): string {
        return this._originalQuantity;
    }

    set originalQuantity( value: string ) {
        this._originalQuantity = value;
    }

    get executedQuantity(): string {
        return this._executedQuantity;
    }

    set executedQuantity( value: string ) {
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

}
