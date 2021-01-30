"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balance = void 0;
/**
 * Represents a single balance.
 */
class Balance {
    constructor(json) {
        this._asset = json.asset || json.a;
        this._available = json.free || json.available || json.f;
        this._locked = json.locked || json.l;
    }
    get asset() {
        return this._asset;
    }
    set asset(value) {
        this._asset = value;
    }
    get available() {
        return this._available;
    }
    set available(value) {
        this._available = value;
    }
    get locked() {
        return this._locked;
    }
    set locked(value) {
        this._locked = value;
    }
}
exports.Balance = Balance;
//# sourceMappingURL=Balance.js.map