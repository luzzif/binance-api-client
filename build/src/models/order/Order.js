"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const OrderStatus_1 = require("../../enums/OrderStatus");
const TimeInForce_1 = require("../../enums/TimeInForce");
const OrderType_1 = require("../../enums/OrderType");
const OrderSide_1 = require("../../enums/OrderSide");
/**
 * Represents a single open order.
 */
class Order {
    constructor(json) {
        this._symbol = json.symbol;
        this._id = json.orderId;
        this._clientId = json.clientOrderId;
        this._price = json.price;
        this._originalQuantity = json.origQty;
        this._executedQuantity = json.executedQty;
        this._status = OrderStatus_1.OrderStatus[json.status];
        this._timeInForce =
            TimeInForce_1.TimeInForce[json.timeInForce];
        this._type = OrderType_1.OrderType[json.type];
        this._side = OrderSide_1.OrderSide[json.side];
        this._stopPrice = json.stopPrice;
        this._icebergQuantity = json.icebergQty;
        this._timestamp = new Date(json.time);
    }
    get symbol() {
        return this._symbol;
    }
    set symbol(value) {
        this._symbol = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get clientId() {
        return this._clientId;
    }
    set clientId(value) {
        this._clientId = value;
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
    get stopPrice() {
        return this._stopPrice;
    }
    set stopPrice(value) {
        this._stopPrice = value;
    }
    get icebergQuantity() {
        return this._icebergQuantity;
    }
    set icebergQuantity(value) {
        this._icebergQuantity = value;
    }
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
}
exports.Order = Order;
//# sourceMappingURL=Order.js.map