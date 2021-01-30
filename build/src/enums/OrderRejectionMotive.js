"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRejectionMotive = void 0;
/**
 * Represents a single order rejection motive.
 */
var OrderRejectionMotive;
(function (OrderRejectionMotive) {
    OrderRejectionMotive[OrderRejectionMotive["NONE"] = 0] = "NONE";
    OrderRejectionMotive[OrderRejectionMotive["UNKNOWN_INSTRUMENT"] = 1] = "UNKNOWN_INSTRUMENT";
    OrderRejectionMotive[OrderRejectionMotive["MARKET_CLOSED"] = 2] = "MARKET_CLOSED";
    OrderRejectionMotive[OrderRejectionMotive["PRICE_QTY_EXCEED_HARD_LIMITS"] = 3] = "PRICE_QTY_EXCEED_HARD_LIMITS";
    OrderRejectionMotive[OrderRejectionMotive["UNKNOWN_ORDER"] = 4] = "UNKNOWN_ORDER";
    OrderRejectionMotive[OrderRejectionMotive["DUPLICATE_ORDER"] = 5] = "DUPLICATE_ORDER";
    OrderRejectionMotive[OrderRejectionMotive["UNKNOWN_ACCOUNT"] = 6] = "UNKNOWN_ACCOUNT";
    OrderRejectionMotive[OrderRejectionMotive["INSUFFICIENT_BALANCE"] = 7] = "INSUFFICIENT_BALANCE";
    OrderRejectionMotive[OrderRejectionMotive["ACCOUNT_INACTIVE"] = 8] = "ACCOUNT_INACTIVE";
    OrderRejectionMotive[OrderRejectionMotive["ACCOUNT_CANNOT_SETTLE"] = 9] = "ACCOUNT_CANNOT_SETTLE";
})(OrderRejectionMotive = exports.OrderRejectionMotive || (exports.OrderRejectionMotive = {}));
//# sourceMappingURL=OrderRejectionMotive.js.map