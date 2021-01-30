"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountData = void 0;
/**
 * Represents a single account data
 */
const Balance_1 = require("./Balance");
class AccountData {
    constructor(json) {
        this._makerCommission = json.makerCommission;
        this._takerCommission = json.takerCommission;
        this._buyerCommission = json.buyerCommission;
        this._sellerCommission = json.sellerCommission;
        this._canTrade = json.canTrade;
        this._canWithdraw = json.canWithdraw;
        this._canDeposit = json.canDeposit;
        this._balances = [];
        for (const balanceJson of json.balances) {
            this._balances.push(new Balance_1.Balance(balanceJson));
        }
    }
    get makerCommission() {
        return this._makerCommission;
    }
    set makerCommission(value) {
        this._makerCommission = value;
    }
    get takerCommission() {
        return this._takerCommission;
    }
    set takerCommission(value) {
        this._takerCommission = value;
    }
    get buyerCommission() {
        return this._buyerCommission;
    }
    set buyerCommission(value) {
        this._buyerCommission = value;
    }
    get sellerCommission() {
        return this._sellerCommission;
    }
    set sellerCommission(value) {
        this._sellerCommission = value;
    }
    get canTrade() {
        return this._canTrade;
    }
    set canTrade(value) {
        this._canTrade = value;
    }
    get canWithdraw() {
        return this._canWithdraw;
    }
    set canWithdraw(value) {
        this._canWithdraw = value;
    }
    get canDeposit() {
        return this._canDeposit;
    }
    set canDeposit(value) {
        this._canDeposit = value;
    }
    get balances() {
        return this._balances;
    }
    set balances(value) {
        this._balances = value;
    }
}
exports.AccountData = AccountData;
//# sourceMappingURL=AccountData.js.map