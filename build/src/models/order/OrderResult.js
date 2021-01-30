"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderResult = void 0;
const OrderStatus_1 = require("../../enums/OrderStatus");
const TimeInForce_1 = require("../../enums/TimeInForce");
const OrderType_1 = require("../../enums/OrderType");
const OrderSide_1 = require("../../enums/OrderSide");
class OrderResult {
    constructor(json) {
        this._symbol = json.symbol;
        this._orderId = json.orderId;
        this._clientOrderId = json.clientOrderId;
        this._timestamp = new Date(json.transactTime);
        this._price = json.price;
        this._originalQuantity = json.origQty;
        this._executedQuantity = json.executedQty;
        this._status = OrderStatus_1.OrderStatus[json.status];
        this._timeInForce =
            TimeInForce_1.TimeInForce[json.timeInForce];
        this._type = OrderType_1.OrderType[json.type];
        this._side = OrderSide_1.OrderSide[json.side];
    }
    get symbol() {
        return this._symbol;
    }
    set symbol(value) {
        this._symbol = value;
    }
    get orderId() {
        return this._orderId;
    }
    set orderId(value) {
        this._orderId = value;
    }
    get clientOrderId() {
        return this._clientOrderId;
    }
    set clientOrderId(value) {
        this._clientOrderId = value;
    }
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get originalQuantity() {
        return this._originalQuantity;
    }
    set originalQuantity(value) {
        this._originalQuantity = value;
    }
    get executedQuantity() {
        return this._executedQuantity;
    }
    set executedQuantity(value) {
        this._executedQuantity = value;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get timeInForce() {
        return this._timeInForce;
    }
    set timeInForce(value) {
        this._timeInForce = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get side() {
        return this._side;
    }
    set side(value) {
        this._side = value;
    }
}
exports.OrderResult = OrderResult;
//# sourceMappingURL=OrderResult.js.map