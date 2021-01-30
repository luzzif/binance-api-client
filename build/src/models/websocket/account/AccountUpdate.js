"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountUpdate = void 0;
/**
 * Represents a single account update.
 */
const Balance_1 = require("../../account/Balance");
class AccountUpdate {
    constructor(json) {
        this._timestamp = new Date(json.E);
        this._balances = [];
        for (const balanceJson of json.B) {
            this._balances.push(new Balance_1.Balance(balanceJson));
        }
    }
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
    get balances() {
        return this._balances;
    }
    set balances(value) {
        this._balances = value;
    }
}
exports.AccountUpdate = AccountUpdate;
//# sourceMappingURL=AccountUpdate.js.map