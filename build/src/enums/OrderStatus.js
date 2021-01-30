"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
/**
 * Represents a single order status.
 */
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["NEW"] = 0] = "NEW";
    OrderStatus[OrderStatus["PARTIALLY_FILLED"] = 1] = "PARTIALLY_FILLED";
    OrderStatus[OrderStatus["FILLED"] = 2] = "FILLED";
    OrderStatus[OrderStatus["CANCELED"] = 3] = "CANCELED";
    OrderStatus[OrderStatus["PENDING_CANCEL"] = 4] = "PENDING_CANCEL";
    OrderStatus[OrderStatus["REJECTED"] = 5] = "REJECTED";
    OrderStatus[OrderStatus["EXPIRED"] = 6] = "EXPIRED";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
//# sourceMappingURL=OrderStatus.js.map