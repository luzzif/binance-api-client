"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderType = void 0;
/**
 * Represents a single order type.
 */
var OrderType;
(function (OrderType) {
    OrderType[OrderType["LIMIT"] = 0] = "LIMIT";
    OrderType[OrderType["MARKET"] = 1] = "MARKET";
    OrderType[OrderType["STOP_LOSS"] = 2] = "STOP_LOSS";
    OrderType[OrderType["STOP_LOSS_LIMIT"] = 3] = "STOP_LOSS_LIMIT";
    OrderType[OrderType["TAKE_PROFIT"] = 4] = "TAKE_PROFIT";
    OrderType[OrderType["TAKE_PROFIT_LIMIT"] = 5] = "TAKE_PROFIT_LIMIT";
    OrderType[OrderType["LIMIT_MAKER"] = 6] = "LIMIT_MAKER";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
//# sourceMappingURL=OrderType.js.map