"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderAcknowledgement = void 0;
/**
 * Represents a single placed order data.
 */
class OrderAcknowledgement {
    constructor(json) {
        this._symbol = json.symbol;
        this._id = json.orderId;
        this._clientId = json.clientOrderId;
        this._timestamp = new Date(json.transactTime);
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
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
}
exports.OrderAcknowledgement = OrderAcknowledgement;
//# sourceMappingURL=OrderAcknowledgement.js.map