"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolStatus = void 0;
/**
 * Represents a single symbol status.
 */
var SymbolStatus;
(function (SymbolStatus) {
    SymbolStatus[SymbolStatus["PRE_TRADING"] = 0] = "PRE_TRADING";
    SymbolStatus[SymbolStatus["TRADING"] = 1] = "TRADING";
    SymbolStatus[SymbolStatus["POST_TRADING"] = 2] = "POST_TRADING";
    SymbolStatus[SymbolStatus["END_OF_DAY"] = 3] = "END_OF_DAY";
    SymbolStatus[SymbolStatus["HALT"] = 4] = "HALT";
    SymbolStatus[SymbolStatus["AUCTION_MATCH"] = 5] = "AUCTION_MATCH";
    SymbolStatus[SymbolStatus["BREAK"] = 6] = "BREAK";
})(SymbolStatus = exports.SymbolStatus || (exports.SymbolStatus = {}));
//# sourceMappingURL=SymbolStatus.js.map