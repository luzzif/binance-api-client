import { OrderSide } from "../../../enums/OrderSide";
import { OrderType } from "../../../enums/OrderType";
import { TimeInForce } from "../../../enums/TimeInForce";
import { OrderExecutionStatus } from "../../../enums/OrderExecutionStatus";
import { OrderStatus } from "../../../enums/OrderStatus";
import { OrderRejectionMotive } from "../../../enums/OrderRejectionMotive";
import { FilterType } from "../../../enums/FilterType";

export class OrderUpdate {

    private _timestamp: Date;
    private _symbol: string;
    private _newClientId: string;
    private _side: OrderSide;
    private _type: OrderType;
    private _timeInForce: TimeInForce;
    private _quantity: number;
    private _price: number;
    private _executionStatus: OrderExecutionStatus;
    private _status: OrderStatus;
    private _rejectionMotive: OrderRejectionMotive;
    private _id: number;
    private _lastFilledTradePrice: number;    
    private _cumulativeFilledQuantity: number;
    private _placedAt: Date;

    constructor( json: any ) {

        this._timestamp = new Date( json.E );
        this._symbol = json.s;
        this._newClientId = json.c;
        this._side = OrderSide[ json.S as keyof typeof OrderSide ];
        this._type = OrderType[ json.o as keyof typeof OrderType ];
        this._timeInForce = TimeInForce[ json.f as keyof typeof TimeInForce ];
        this._quantity = json.q;
        this._price = json.p;
        this._executionStatus = OrderExecutionStatus[ json.x as keyof typeof OrderExecutionStatus ];
        this._status = OrderStatus[ json.X as keyof typeof OrderStatus ];
        this._rejectionMotive = OrderRejectionMotive[ json.r as keyof typeof OrderRejectionMotive ];
        this._id = json.i;
        this._lastFilledTradePrice = json.L;
        this._cumulativeFilledQuantity = json.z;
        this._placedAt = new Date( json.T );

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

    get newClientId(): string {
        return this._newClientId;
    }

    set newClientId( value: string ) {
        this._newClientId = value;
    }

    get side(): OrderSide {
        return this._side;
    }

    set side( value: OrderSide ) {
        this._side = value;
    }

    get type(): OrderType {
        return this._type;
    }

    set type( value: OrderType ) {
        this._type = value;
    }

    get timeInForce(): TimeInForce {
        return this._timeInForce;
    }

    set timeInForce( value: TimeInForce ) {
        this._timeInForce = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity( value: number ) {
        this._quantity = value;
    }

    get price(): number {
        return this._price;
    }

    set price( value: number ) {
        this._price = value;
    }

    get executionStatus(): OrderExecutionStatus {
        return this._executionStatus;
    }

    set executionStatus( value: OrderExecutionStatus ) {
        this._executionStatus = value;
    }

    get status(): OrderStatus {
        return this._status;
    }

    set status( value: OrderStatus ) {
        this._status = value;
    }

    get rejectionMotive() {
        return this._rejectionMotive;
    }

    set rejectionMotive( value ) {
        this._rejectionMotive = value;
    }

    get id(): number {
        return this._id;
    }

    set id( value: number ) {
        this._id = value;
    }

    get lastFilledTradePrice(): number {
        return this._lastFilledTradePrice;
    }

    set lastFilledTradePrice( value: number ) {
        this._lastFilledTradePrice = value;
    }

    get cumulativeFilledQuantity(): number {
        return this._cumulativeFilledQuantity;
    }

    set cumulativeFilledQuantity(value: number) {
        this._cumulativeFilledQuantity = value;
    }

    get placedAt(): Date {
        return this._placedAt;
    }

    set placedAt( value: Date ) {
        this._placedAt = value;
    }

}