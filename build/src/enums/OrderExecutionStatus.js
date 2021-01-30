"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderExecutionStatus = void 0;
/**
 * Represents a single order execution status.
 */
var OrderExecutionStatus;
(function (OrderExecutionStatus) {
    OrderExecutionStatus[OrderExecutionStatus["NEW"] = 0] = "NEW";
    OrderExecutionStatus[OrderExecutionStatus["CANCELED"] = 1] = "CANCELED";
    OrderExecutionStatus[OrderExecutionStatus["REPLACED"] = 2] = "REPLACED";
    OrderExecutionStatus[OrderExecutionStatus["REJECTED"] = 3] = "REJECTED";
    OrderExecutionStatus[OrderExecutionStatus["TRADE"] = 4] = "TRADE";
    OrderExecutionStatus[OrderExecutionStatus["EXPIRED"] = 5] = "EXPIRED";
})(OrderExecutionStatus = exports.OrderExecutionStatus || (exports.OrderExecutionStatus = {}));
//# sourceMappingURL=OrderExecutionStatus.js.map