"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderUpdate = void 0;
const OrderSide_1 = require("../../../enums/OrderSide");
const OrderType_1 = require("../../../enums/OrderType");
const TimeInForce_1 = require("../../../enums/TimeInForce");
const OrderExecutionStatus_1 = require("../../../enums/OrderExecutionStatus");
const OrderStatus_1 = require("../../../enums/OrderStatus");
const OrderRejectionMotive_1 = require("../../../enums/OrderRejectionMotive");
class OrderUpdate {
    constructor(json) {
        this._timestamp = new Date(json.E);
        this._symbol = json.s;
        this._newClientId = json.c;
        this._side = OrderSide_1.OrderSide[json.S];
        this._type = OrderType_1.OrderType[json.o];
        this._timeInForce = TimeInForce_1.TimeInForce[json.f];
        this._quantity = parseFloat(json.q);
        this._price = parseFloat(json.p);
        this._executionStatus =
            OrderExecutionStatus_1.OrderExecutionStatus[json.x];
        this._status = OrderStatus_1.OrderStatus[json.X];
        this._rejectionMotive =
            OrderRejectionMotive_1.OrderRejectionMotive[json.r];
        this._id = json.i;
        this._lastFilledTradePrice = parseFloat(json.L);
        this._lastExecutedQuantity = parseFloat(json.l);
        this._cumulativeFilledQuantity = parseFloat(json.z);
        this._placedAt = new Date(json.T);
    }
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
    get symbol() {
        return this._symbol;
    }
    set symbol(value) {
        this._symbol = value;
    }
    get newClientId() {
        return this._newClientId;
    }
    set newClientId(value) {
        this._newClientId = value;
    }
    get side() {
        return this._side;
    }
    set side(value) {
        this._side = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get timeInForce() {
        return this._timeInForce;
    }
    set timeInForce(value) {
        this._timeInForce = value;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(value) {
        this._quantity = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get executionStatus() {
        return this._executionStatus;
    }
    set executionStatus(value) {
        this._executionStatus = value;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get rejectionMotive() {
        return this._rejectionMotive;
    }
    set rejectionMotive(value) {
        this._rejectionMotive = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get lastFilledTradePrice() {
        return this._lastFilledTradePrice;
    }
    set lastFilledTradePrice(value) {
        this._lastFilledTradePrice = value;
    }
    get lastExecutedQuantity() {
        return this._lastExecutedQuantity;
    }
    set lastExecutedQuantity(value) {
        this._lastExecutedQuantity = value;
    }
    get cumulativeFilledQuantity() {
        return this._cumulativeFilledQuantity;
    }
    set cumulativeFilledQuantity(value) {
        this._cumulativeFilledQuantity = value;
    }
    get placedAt() {
        return this._placedAt;
    }
    set placedAt(value) {
        this._placedAt = value;
    }
}
exports.OrderUpdate = OrderUpdate;
//# sourceMappingURL=OrderUpdate.js.map