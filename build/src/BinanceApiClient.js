"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinanceApiClient = void 0;
const AuthenticationMethod_1 = require("./enums/AuthenticationMethod");
const ApiVersion_1 = require("./enums/ApiVersion");
const CryptoJs = require("crypto-js");
const HttpMethod_1 = require("./enums/HttpMethod");
const AuthenticationError_1 = require("./errors/AuthenticationError");
const request = require("request-promise");
const Path = require("path");
const util_1 = require("util");
const url_1 = require("url");
const OrderBook_1 = require("./models/depth/OrderBook");
const ApiError_1 = require("./errors/ApiError");
const Order_1 = require("./models/order/Order");
const Candlestick_1 = require("./models/candlestick/Candlestick");
const TickerStatistics_1 = require("./models/ticker/TickerStatistics");
const LatestPrice_1 = require("./models/depth/LatestPrice");
const Ticker_1 = require("./models/ticker/Ticker");
const OrderSide_1 = require("./enums/OrderSide");
const OrderType_1 = require("./enums/OrderType");
const TimeInForce_1 = require("./enums/TimeInForce");
const OrderAcknowledgement_1 = require("./models/order/OrderAcknowledgement");
const CanceledOrderData_1 = require("./models/order/CanceledOrderData");
const AccountData_1 = require("./models/account/AccountData");
const Trade_1 = require("./models/trade/Trade");
const WebSocket = require("ws");
const OrderBookUpdate_1 = require("./models/websocket/depth/OrderBookUpdate");
const CandlestickUpdate_1 = require("./models/websocket/candlestick/CandlestickUpdate");
const TradeUpdate_1 = require("./models/websocket/trade/TradeUpdate");
const AccountUpdate_1 = require("./models/websocket/account/AccountUpdate");
const OrderUpdate_1 = require("./models/websocket/order/OrderUpdate");
const ExchangeInfo_1 = require("./models/misc/ExchangeInfo");
const ResponseType_1 = require("./enums/ResponseType");
const OrderResult_1 = require("./models/order/OrderResult");
const OrderFull_1 = require("./models/order/OrderFull");
const websocket_heartbeats_1 = require("websocket-heartbeats");
/**
 * Represents a single Binance API client.
 */
class BinanceApiClient {
    /**
     * Initializes a new Binance API client.
     *
     * @param apiKey    The personal account API key.
     * @param apiSecret The personal account API secret.
     */
    constructor(apiKey, apiSecret) {
        BinanceApiClient.API_KEY = apiKey;
        BinanceApiClient.API_SECRET = apiSecret;
    }
    /**
     * Interface to the "GET v1/ping" Binance's API operation.
     */
    ping() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.makeRequest(HttpMethod_1.HttpMethod.GET, ApiVersion_1.ApiVersion.V1, "ping", AuthenticationMethod_1.AuthenticationMethod.NONE);
        });
    }
    getExchangeInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return new ExchangeInfo_1.ExchangeInfo(yield this.makeRequest(HttpMethod_1.HttpMethod.GET, ApiVersion_1.ApiVersion.V1, "exchangeInfo", AuthenticationMethod_1.AuthenticationMethod.NONE));
        });
    }
    /**
     * Interface to the "GET v1/time" Binance's API operation.
     *
     * @returns The Binance's server time.
     */
    getServerTime() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Date((yield this.makeRequest(HttpMethod_1.HttpMethod.GET, ApiVersion_1.ApiVersion.V1, "time", AuthenticationMethod_1.AuthenticationMethod.NONE)).serverTime);
        });
    }
    /**
     * Interface to the "GET v1/depth" Binance's API operation.
     *
     * @param symbol The symbol for which we want to retrieve the order book.
     * @param limit  The maximum number of orders in the returned order book.
     *
     * @returns The order book respecting the given constraints.
     */
    getOrderBook(symbol, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return new OrderBook_1.OrderBook(yield this.makeRequest(HttpMethod_1.HttpMethod.GET, ApiVersion_1.ApiVersion.V1, "depth", AuthenticationMethod_1.AuthenticationMethod.NONE, ["symbol", symbol], ["limit", limit]));
        });
    }
    /**
     * Interface to the "GET v1/klines" Binance's API operation. Get
     * candlestick bars for the specified symbol, respecting
     * all the other given constraints. Candlesticks are uniquely
     * identified by their opening time.
     *
     * @param symbol    The symbol for which we want to retrieve the
     *                  candlesticks.
     * @param interval  The interval which the requested candlesticks refer to.
     * @param limit     The maximum number of candlesticks returned.
     * @param startTime The time from which the candlesticks are returned.
     * @param endTime   The time until which the candlesticks are returned.
     *
     * @returns A candlesticks array respecting the given constraints.
     */
    getCandlesticks(symbol, interval, limit, startTime, endTime) {
        return __awaiter(this, void 0, void 0, function* () {
            const candlesticksJson = yield this.makeRequest(HttpMethod_1.HttpMethod.GET, ApiVersion_1.ApiVersion.V1, "klines", AuthenticationMethod_1.AuthenticationMethod.NONE, ["symbol", symbol], ["interval", interval], ["limit", limit], ["startTime", startTime], ["endTime", endTime]);
            const candlesticks = [];
            for (const candlestickJson of candlesticksJson) {
                candlesticks.push(new Candlestick_1.Candlestick(candlestickJson));
            }
            return candlesticks;
        });
    }
    /**
     * Interface to the "GET v1/ticker/24hr" Binance's API operation.
     * Get last 24 hours price change statistics.
     *
     * @param symbol The symbol for which we want to retrieve the
     *               last day ticker statistics.
     *
     * @returns The last 24-hour ticker statistics.
     */
    getLastDayTickerStatistics(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            return new TickerStatistics_1.TickerStatistics(yield this.makeRequest(HttpMethod_1.HttpMethod.GET, ApiVersion_1.ApiVersion.V1, "ticker/24hr", AuthenticationMethod_1.AuthenticationMethod.NONE, ["symbol", symbol]));
        });
    }
    /**
     * Interface to the "GET v1/ticker/allPrices" Binance's API operation.
     * Get the latest price for all symbols.
     *
     * @returns A latest prices array for all the symbols.
     */
    getLatestPrices() {
        return __awaiter(this, void 0, void 0, function* () {
            const latestPricesJson = yield this.makeRequest(HttpMethod_1.HttpMethod.GET, ApiVersion_1.ApiVersion.V1, "ticker/allPrices", AuthenticationMethod_1.AuthenticationMethod.NONE);
            const latestPrices = [];
            for (const latestPriceJson of latestPricesJson) {
                latestPrices.push(new LatestPrice_1.LatestPrice(latestPriceJson));
            }
            return latestPrices;
        });
    }
    /**
     * Interface to the "GET v1/ticker/allBookTickers" Binance's API operation.
     * Get the best price/quantity in the order book for all symbols.
     *
     * @returns The best price/quantity in the order book for all symbols.
     */
    getTickers() {
        return __awaiter(this, void 0, void 0, function* () {
            const tickersJson = yield this.makeRequest(HttpMethod_1.HttpMethod.GET, ApiVersion_1.ApiVersion.V1, "ticker/allBookTickers", AuthenticationMethod_1.AuthenticationMethod.NONE);
            const tickers = [];
            for (const tickerJson of tickersJson) {
                tickers.push(new Ticker_1.Ticker(tickerJson));
            }
            return tickers;
        });
    }
    /**
     * Interface to the "POST v3/order" Binance's API operation. Places a new order
     * respecting the given constraints.
     *
     * @param symbol          The market on which the order is to be placed.
     * @param side            Whether the order is a buy or sell.
     * @param type            Whether the order is at limit or market.
     * @param timeInForce     Whether the time in force should be GTC or IOC.
     * @param quantity        The quantity of assets that is to be moved.
     * @param price           The price at which the order should be filled.
     * @param clientOrderId   A unique ID associated with the order
     *                        (automatically generated if not sent).
     * @param stopPrice       The price at which a stop order should be filled.
     * @param icebergQuantity Only used with iceberg orders.
     * @param responseType    Set the response JSON. ACK, RESULT, or FULL; default: RESULT.
     *
     * @returns The just-placed order data.
     */
    placeOrder(symbol, side, type, timeInForce, quantity, price, clientOrderId, stopPrice, icebergQuantity, responseType) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonResponse = yield this.makeRequest(HttpMethod_1.HttpMethod.POST, ApiVersion_1.ApiVersion.V3, "order", AuthenticationMethod_1.AuthenticationMethod.SIGNED, ["symbol", symbol], ["side", OrderSide_1.OrderSide[side]], ["type", OrderType_1.OrderType[type]], [
                "timeInForce",
                type === OrderType_1.OrderType.MARKET || type === OrderType_1.OrderType.STOP_LOSS
                    ? null
                    : TimeInForce_1.TimeInForce[timeInForce]
            ], ["quantity", quantity], [
                "price",
                type === OrderType_1.OrderType.MARKET || type === OrderType_1.OrderType.STOP_LOSS
                    ? null
                    : price
            ], ["newClientOrderId", clientOrderId], ["stopPrice", stopPrice], ["icebergQty", icebergQuantity], [
                "newOrderRespType",
                util_1.isNullOrUndefined(responseType)
                    ? null
                    : ResponseType_1.ResponseType[responseType]
            ]);
            switch (responseType) {
                case ResponseType_1.ResponseType.RESULT: {
                    return new OrderResult_1.OrderResult(jsonResponse);
                }
                case ResponseType_1.ResponseType.FULL: {
                    return new OrderFull_1.OrderFull(jsonResponse);
                }
                default: {
                    return new OrderAcknowledgement_1.OrderAcknowledgement(jsonResponse);
                }
            }
        });
    }
    /**
     * Interface to the "POST v3/order/test" Binance's API operation. Places a new
     * test order respecting the given constraints.
     *
     * @param symbol          The market on which the order is to be placed.
     * @param side            Whether the order is a buy or sell.
     * @param type            Whether the order is at limit or market.
     * @param timeInForce     Whether the time in force should be GTC or IOC.
     * @param quantity        The quantity of assets that is to be moved.
     * @param price           The price at which the order should be filled.
     * @param clientId        A unique ID associated with the order.
     *                        (automatically generated if not sent).
     * @param stopPrice       The price at which a stop order should be filled.
     * @param icebergQuantity Only used with iceberg orders.
     * @param timeout         The request validity maximum time frame
     *                        (defaults to 5000 ms).
     */
    testOrder(symbol, side, type, timeInForce, quantity, price, clientId, stopPrice, icebergQuantity, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.makeRequest(HttpMethod_1.HttpMethod.POST, ApiVersion_1.ApiVersion.V3, "order/test", AuthenticationMethod_1.AuthenticationMethod.SIGNED, ["symbol", symbol], ["side", OrderSide_1.OrderSide[side]], ["type", OrderType_1.OrderType[type]], ["timeInForce", TimeInForce_1.TimeInForce[timeInForce]], ["quantity", quantity], ["price", price], ["newClientOrderId", clientId], ["stopPrice", stopPrice], ["icebergQty", icebergQuantity], ["recvWindow", timeout]);
        });
    }
    /**
     * Interface to the "GET v3/order" Binance's API operation. Gets a
     * placed order detail given some constraints.
     *
     * @param symbol   The market on which the order was originally placed.
     * @param id       The wanted order ID.
     * @param clientId The wanted client given order ID (its description).
     * @param timeout  The request validity maximum time frame
     *                 (defaults to 5000 ms).
     *
     * @return The placed order detail respecting the given constraints.
     */
    getOrder(symbol, id, clientId, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Order_1.Order(yield this.makeRequest(HttpMethod_1.HttpMethod.GET, ApiVersion_1.ApiVersion.V3, "order", AuthenticationMethod_1.AuthenticationMethod.SIGNED, ["symbol", symbol], ["orderId", id], ["origClientOrderId", clientId], ["recvWindow", timeout]));
        });
    }
    /**
     * Interface to the "DEconstE v3/order" Binance's API operation.
     * Cancels a previously placed order.
     *
     * @param symbol      The market on which the order was originally placed.
     * @param id          The wanted order ID.
     * @param oldClientId The pre-cancel client given order ID (its description).
     * @param newClientId The post-cancel order ID (automatically generated if not passed).
     * @param timeout     The request validity maximum time frame
     *                    (defaults to 5000 ms).
     *
     * @return The just-canceled order data.
     */
    cancelOrder(symbol, id, oldClientId, newClientId, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            return new CanceledOrderData_1.CanceledOrderData(yield this.makeRequest(HttpMethod_1.HttpMethod.DELETE, ApiVersion_1.ApiVersion.V3, "order", AuthenticationMethod_1.AuthenticationMethod.SIGNED, ["symbol", symbol], ["orderId", id], ["origClientOrderId", oldClientId], ["newClientOrderId", newClientId], ["recvWindow", timeout]));
        });
    }
    /**
     * Interface to the "GET v3/openOrders" Binance's API operation.
     *
     * @param market  The symbol for which we want to retrieve the open orders (if any).
     * @param timeout The request validity maximum time frame (defaults to 5000 ms).
     *
     * @returns An array representing all of the account's open orders.
     */
    getOpenOrders(market, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const openOrdersJson = yield this.makeRequest(HttpMethod_1.HttpMethod.GET, ApiVersion_1.ApiVersion.V3, "openOrders", AuthenticationMethod_1.AuthenticationMethod.SIGNED, ["symbol", market], ["recvWindow", timeout]);
            const openOrders = [];
            for (const openOrderJson of openOrdersJson) {
                openOrders.push(new Order_1.Order(openOrderJson));
            }
            return openOrders;
        });
    }
    /**
     * Interface to the "GET v3/allOrders" Binance's API operation. Get all account
     * orders (active, canceled, or filled).
     *
     * @param symbol  The symbol for which we want to retrieve the orders.
     * @param id      The order ID from which we want to retrieve the orders
     *                (if set, the API will retrieve the orders with an ID greater
     *                or equal to the one specified, otherwise the most recent orders).
     * @param limit   The maximum number of returned orders.
     * @param timeout The request validity maximum time frame (defaults to 5000 ms).
     *
     * @returns An array representing all of the account's orders in every state.
     */
    getOrders(symbol, id, limit, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const ordersJson = yield this.makeRequest(HttpMethod_1.HttpMethod.GET, ApiVersion_1.ApiVersion.V3, "allOrders", AuthenticationMethod_1.AuthenticationMethod.SIGNED, ["symbol", symbol], ["orderId", id], ["limit", limit], ["recvWindow", timeout]);
            const orders = [];
            for (const orderJson of ordersJson) {
                orders.push(new Order_1.Order(orderJson));
            }
            return orders;
        });
    }
    /**
     * Interface to the "GET v3/account" Binance's API operation. Get current
     * account information.
     *
     * @param timeout The request validity maximum time frame (defaults to 5000 ms).
     *
     * @returns The current account information.
     */
    getAccountData(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            return new AccountData_1.AccountData(yield this.makeRequest(HttpMethod_1.HttpMethod.GET, ApiVersion_1.ApiVersion.V3, "account", AuthenticationMethod_1.AuthenticationMethod.SIGNED, ["recvWindow", timeout]));
        });
    }
    /**
     * Interface to the "GET v3/myTrades" Binance's API operation. Get trades for
     * a specific account and symbol.
     *
     * @param symbol  The market on which the trades were originally executed.
     * @param limit   The maximum number of returned trades.
     * @param fromId  The trade's ID to start fetching from. If not given, the
     *                API will retrieve the most recent trades first.
     * @param timeout The request validity maximum time frame (defaults to 5000 ms).
     *
     * @returns The account's trade list respecting the given constraints.
     */
    getTrades(symbol, limit, fromId, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const tradesJson = yield this.makeRequest(HttpMethod_1.HttpMethod.GET, ApiVersion_1.ApiVersion.V3, "myTrades", AuthenticationMethod_1.AuthenticationMethod.SIGNED, ["symbol", symbol], ["limit", limit], ["fromId", fromId], ["recvWindow", timeout]);
            const trades = [];
            for (const tradeJson of tradesJson) {
                trades.push(new Trade_1.Trade(tradeJson));
            }
            return trades;
        });
    }
    /**
     * Interface to the "POST v1/userDataStream" Binance's API operation.
     * Initializes a new data stream.
     *
     * @returns A listen key to be passed as a parameter when starting a
     *          new data stream.
     */
    openUserStream() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.makeRequest(HttpMethod_1.HttpMethod.POST, ApiVersion_1.ApiVersion.V1, "userDataStream", AuthenticationMethod_1.AuthenticationMethod.API_KEY)).listenKey;
        });
    }
    /**
     * Interface to the "PUT v1/userDataStream" Binance's API operation.
     * Pings a user data stream in order to prevent a time out.
     *
     * @param streamId A string representing the stream's ID
     *                (returned by [[openUserStream]]).
     */
    keepAliveUserStream(streamId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.makeRequest(HttpMethod_1.HttpMethod.PUT, ApiVersion_1.ApiVersion.V1, "userDataStream", AuthenticationMethod_1.AuthenticationMethod.API_KEY, ["listenKey", streamId]);
        });
    }
    /**
     * Interface to the "DEconstE v1/userDataStream" Binance's API operation.
     * Closes out a user data stream.
     *
     * @param streamId A string representing the stream's ID
     *                (returned by [[openUserStream]]).
     */
    closeUserStream(streamId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.makeRequest(HttpMethod_1.HttpMethod.DELETE, ApiVersion_1.ApiVersion.V1, "userDataStream", AuthenticationMethod_1.AuthenticationMethod.API_KEY, ["listenKey", streamId]);
        });
    }
    /**
     * Initializes a web socket data stream that gives us information about a
     * single symbol's order book updates. Stream keepalive is performed through
     * [[keepAliveUserStream]] following the rules described
     * [here](https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md)
     *
     * @param symbol            The symbol of which we want to get the order book updates.
     * @param onUpdate          A function to be called when a new update is received.
     * @param connectionTimeout Timeout based on which the web socket connection is
     *                          considered to be broken based on a heartbeat monitor.
     * @param onLostConnection  A callback to be invoked when the web socket connection
     *                          is detected as broken.
     */
    monitorOrderBook(symbol, onUpdate, connectionTimeout, onLostConnection) {
        const websocket = new WebSocket(BinanceApiClient.WS_BASE_URL + symbol.toLowerCase() + "@depth", { perMessageDeflate: false });
        new websocket_heartbeats_1.HeartbeatHandler(websocket, util_1.isNullOrUndefined(connectionTimeout)
            ? BinanceApiClient.DEFAULT_WS_TIMEOUT
            : connectionTimeout, onLostConnection).handle();
        websocket.on("message", (data) => {
            onUpdate(new OrderBookUpdate_1.OrderBookUpdate(JSON.parse(data)));
        });
    }
    /**
     * Initializes a web socket data stream that gives us information about
     * Kline/candlestick updates. Stream keepalive is performed through
     * [[keepAliveUserStream]] following the rules described
     * [here](https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md)
     *
     * @param symbol            The symbol of which we want to get the candlestick updates.
     * @param interval          The interval to which the requested candlestick updates
     *                          refer to.
     * @param onUpdate          A function to be called when a new update is received.
     * @param connectionTimeout Timeout based on which the web socket connection is
     *                          considered to be broken based on a heartbeat monitor.
     * @param onLostConnection  A callback to be invoked when the web socket connection
     *                          is detected as broken.
     */
    monitorCandlesticks(symbol, interval, onUpdate, connectionTimeout, onLostConnection) {
        return __awaiter(this, void 0, void 0, function* () {
            const websocket = new WebSocket(BinanceApiClient.WS_BASE_URL +
                symbol.toLowerCase() +
                "@kline_" +
                interval, { perMessageDeflate: false });
            new websocket_heartbeats_1.HeartbeatHandler(websocket, util_1.isNullOrUndefined(connectionTimeout)
                ? BinanceApiClient.DEFAULT_WS_TIMEOUT
                : connectionTimeout, onLostConnection).handle();
            websocket.on("message", (data) => {
                onUpdate(new CandlestickUpdate_1.CandlestickUpdate(JSON.parse(data)));
            });
        });
    }
    /**
     * Initializes a web socket data stream that gives us information about
     * trade updates. Stream keepalive is performed through
     * [[keepAliveUserStream]] following the rules described
     * [here](https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md)
     *
     * @param symbol            The symbol of which we want to get the trade updates.
     * @param onUpdate          A function to be called when a new update is received.
     * @param connectionTimeout Timeout based on which the web socket connection is
     *                          considered to be broken based on a heartbeat monitor.
     * @param onLostConnection  A callback to be invoked when the web socket connection
     *                          is detected as broken.
     */
    monitorTrades(symbol, onUpdate, connectionTimeout, onLostConnection) {
        const websocket = new WebSocket(BinanceApiClient.WS_BASE_URL + symbol.toLowerCase() + "@aggTrade", { perMessageDeflate: false });
        new websocket_heartbeats_1.HeartbeatHandler(websocket, util_1.isNullOrUndefined(connectionTimeout)
            ? BinanceApiClient.DEFAULT_WS_TIMEOUT
            : connectionTimeout, onLostConnection).handle();
        websocket.on("message", (data) => {
            onUpdate(new TradeUpdate_1.TradeUpdate(JSON.parse(data)));
        });
    }
    /**
     * Initializes a web socket data stream that gives us information about
     * the personal account updates. Stream keepalive is performed through
     * [[keepAliveUserStream]] following the rules described
     * [here](https://github.com/binance-exchange/binance-official-api-docs/blob/master/user-data-stream.md)
     *
     * @param listenKey         The listen key returned when a user data stream gets
     *                          initialized by [[openUserStream]].
     * @param onUpdate          A function to be called when a new update is received.
     * @param connectionTimeout Timeout based on which the web socket connection is
     *                          considered to be broken based on a heartbeat monitor.
     * @param onLostConnection  A callback to be invoked when the web socket connection
     *                          is detected as broken.
     */
    monitorUser(listenKey, onUpdate, connectionTimeout, onLostConnection) {
        const websocket = new WebSocket(BinanceApiClient.WS_BASE_URL + listenKey, { perMessageDeflate: false });
        new websocket_heartbeats_1.HeartbeatHandler(websocket, util_1.isNullOrUndefined(connectionTimeout)
            ? BinanceApiClient.DEFAULT_WS_TIMEOUT
            : connectionTimeout, onLostConnection).handle();
        websocket.on("message", (data) => {
            const jsonData = JSON.parse(data);
            switch (jsonData.e) {
                case "outboundAccountInfo": {
                    onUpdate(new AccountUpdate_1.AccountUpdate(jsonData));
                    break;
                }
                case "executionReport": {
                    onUpdate(new OrderUpdate_1.OrderUpdate(jsonData));
                    break;
                }
            }
        });
    }
    /**
     * Utility method that sets up and sends a request to the Binance's API, handling
     * the authentication through the API key and API secret parameters possibly given
     * when instantiating the client itself.
     *
     * @param httpMethod             The HTTP method through which the specified API is accessed.
     * @param accessedResource       The Binance's API resource that we would like to access.
     * @param apiVersion             The API version at which the wanted resource can be accessed.
     * @param requiredAuthentication The authentication type required in order to access the
     *                               specified resource.
     * @param parameters             The parameters which the accessed resource may use in order to
     *                               give us the expected result.
     *
     * @returns Either the promise of the Binance's API JSON response, or the
     *          JSON response if using the await construct.
     */
    makeRequest(httpMethod, apiVersion, accessedResource, requiredAuthentication, ...parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = new url_1.URL(Path.join("api", apiVersion, accessedResource), "https://api.binance.com");
            for (const parameter of parameters) {
                if (util_1.isNullOrUndefined(parameter[1])) {
                    continue;
                }
                apiUrl.searchParams.append(parameter[0], parameter[1].toString());
            }
            const headers = this.setupAuthentication(httpMethod, apiUrl, requiredAuthentication);
            try {
                return yield request({
                    method: HttpMethod_1.HttpMethod[httpMethod],
                    url: apiUrl.href,
                    headers: headers,
                    json: true
                });
            }
            catch (error) {
                throw new ApiError_1.ApiError(error.error.code, error.error.msg);
            }
        });
    }
    /**
     * Utility method setting up the request in order to handle Binance's various
     * authentication methods.
     *
     * @param httpMethod           The HTTP method used to access the wanted resource
     *                             (mainly used for error logging purposes).
     * @param apiUrl               The URL at which the wanted resource can be accessed.
     * @param authenticationMethod The authentication method through which the wanted
     *                             resource can be accessed through the specified URL.
     */
    setupAuthentication(httpMethod, apiUrl, authenticationMethod) {
        const headers = {};
        if (authenticationMethod === AuthenticationMethod_1.AuthenticationMethod.NONE) {
            return;
        }
        if (util_1.isNullOrUndefined(BinanceApiClient.API_KEY)) {
            throw new AuthenticationError_1.AuthenticationError(httpMethod, apiUrl, authenticationMethod);
        }
        headers["X-MBX-APIKEY"] = BinanceApiClient.API_KEY;
        if (authenticationMethod === AuthenticationMethod_1.AuthenticationMethod.SIGNED) {
            if (util_1.isNullOrUndefined(BinanceApiClient.API_SECRET)) {
                throw new AuthenticationError_1.AuthenticationError(httpMethod, apiUrl, authenticationMethod);
            }
            apiUrl.searchParams.append("timestamp", new Date().getTime().toString());
            apiUrl.searchParams.append("signature", CryptoJs.HmacSHA256(apiUrl.searchParams.toString(), BinanceApiClient.API_SECRET).toString());
        }
        return headers;
    }
}
exports.BinanceApiClient = BinanceApiClient;
BinanceApiClient.WS_BASE_URL = "wss://stream.binance.com:9443/ws/";
BinanceApiClient.DEFAULT_WS_TIMEOUT = 60000;
//# sourceMappingURL=BinanceApiClient.js.map