"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimit = void 0;
const RateLimitType_1 = require("../../enums/RateLimitType");
const RateLimitInterval_1 = require("../../enums/RateLimitInterval");
class RateLimit {
    constructor(json) {
        this._type = RateLimitType_1.RateLimitType[json.rateLimitType];
        this._interval = RateLimitInterval_1.RateLimitInterval[json.interval];
        this._value = json.limit;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get interval() {
        return this._interval;
    }
    set interval(value) {
        this._interval = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
}
exports.RateLimit = RateLimit;
//# sourceMappingURL=RateLimit.js.map