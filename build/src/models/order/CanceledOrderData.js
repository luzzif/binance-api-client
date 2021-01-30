"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanceledOrderData = void 0;
/**
 * Represents a single canceled order data.
 */
class CanceledOrderData {
    constructor(json) {
        this._symbol = json.symbol;
        this._id = json.orderId;
        this._oldclientId = json.origClientOrderId;
        this._clientId = json.clientOrderId;
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
    get oldclientId() {
        return this._oldclientId;
    }
    set oldclientId(value) {
        this._oldclientId = value;
    }
    get clientId() {
        return this._clientId;
    }
    set clientId(value) {
        this._clientId = value;
    }
}
exports.CanceledOrderData = CanceledOrderData;
//# sourceMappingURL=CanceledOrderData.js.map