import { AuthenticationMethod } from "./enums/AuthenticationMethod";
import { ApiVersion } from "./enums/ApiVersion";
import * as CryptoJs from "crypto-js";
import { HttpMethod } from "./enums/HttpMethod";
import { AuthenticationError } from "./errors/AuthenticationError";
import * as request from "request-promise";
import * as Path from "path";
import { isNullOrUndefined } from "util";
import { URL } from "url";
import { OrderBook } from "./models/depth/OrderBook";
import { ApiError } from "./errors/ApiError";
import { Order } from "./models/order/Order";
import { CandlestickInterval } from "./enums/CandlestickInterval";
import { Candlestick } from "./models/candlestick/Candlestick";
import { TickerStatistics } from "./models/ticker/TickerStatistics";
import { LatestPrice } from "./models/depth/LatestPrice";
import { Ticker } from "./models/ticker/Ticker";
import { OrderSide } from "./enums/OrderSide";
import { OrderType } from "./enums/OrderType";
import { TimeInForce } from "./enums/TimeInForce";
import { OrderAcknowledgement } from "./models/order/OrderAcknowledgement";
import { CanceledOrderData } from "./models/order/CanceledOrderData";
import { AccountData } from "./models/account/AccountData";
import { Trade } from "./models/trade/Trade";
import * as WebSocket from "ws";
import { OrderBookUpdate } from "./models/websocket/depth/OrderBookUpdate";
import { CandlestickUpdate } from "./models/websocket/candlestick/CandlestickUpdate";
import { TradeUpdate } from "./models/websocket/trade/TradeUpdate";
import { AccountUpdate } from "./models/websocket/account/AccountUpdate";
import { OrderUpdate } from "./models/websocket/order/OrderUpdate";
import { ExchangeInfo } from "./models/misc/ExchangeInfo";
import { ResponseType } from "./enums/ResponseType";
import { OrderResult } from "./models/order/OrderResult";
import { OrderFull } from "./models/order/OrderFull";
import { HeartbeatHandler } from "websocket-heartbeats";
import { IncomingMessage } from "http";

/**
 * Represents a single Binance API client.
 */
export class BinanceApiClient {

    private static readonly COMBINED_WS_BASE_URL: string = "wss://stream.binance.com:9443/stream?streams=";
    private static readonly WS_BASE_URL: string = "wss://stream.binance.com:9443/ws/";
    private static readonly DEFAULT_WS_TIMEOUT: number = 60000;

    private static API_KEY: string;
    private static API_SECRET: string;

    /**
     * Initializes a new Binance API client.
     *
     * @param apiKey    The personal account API key.
     * @param apiSecret The personal account API secret.
     */
    constructor( apiKey?: string, apiSecret?: string ) {
        BinanceApiClient.API_KEY = apiKey;
        BinanceApiClient.API_SECRET = apiSecret;
    }

    /**
     * Interface to the "GET v1/ping" Binance's API operation.
     */
    public async ping(): Promise< void > {

        await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V1,
            "ping",
            AuthenticationMethod.NONE
        );

    }

    public async getExchangeInfo(): Promise< ExchangeInfo > {

        return new ExchangeInfo( await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V1,
            "exchangeInfo",
            AuthenticationMethod.NONE
        ) );

    }

    /**
     * Interface to the "GET v1/time" Binance's API operation.
     *
     * @returns The Binance's server time.
     */
    public async getServerTime(): Promise< Date > {

        return new Date( ( await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V1,
            "time",
            AuthenticationMethod.NONE
        ) ).serverTime );

    }

    /**
     * Interface to the "GET v1/depth" Binance's API operation.
     *
     * @param symbol The symbol for which we want to retrieve the order book.
     * @param limit  The maximum number of orders in the returned order book.
     *
     * @returns The order book respecting the given constraints.
     */
    public async getOrderBook( symbol: string, limit?: number ): Promise< OrderBook > {

        return new OrderBook( await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V1,
            "depth",
            AuthenticationMethod.NONE,
            [ "symbol", symbol ],
            [ "limit", limit ]
        ) );

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
    public async getCandlesticks(
        symbol: string,
        interval: CandlestickInterval,
        limit?: number,
        startTime?: number,
        endTime?: number ): Promise< Candlestick[] > {

        let candlesticksJson: any = await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V1,
            "klines",
            AuthenticationMethod.NONE,
            [ "symbol", symbol ],
            [ "interval", interval ],
            [ "limit", limit ],
            [ "startTime", startTime ],
            [ "endTime", endTime ]
        );

        let candlesticks: Candlestick[] = [];
        for( let candlestickJson of candlesticksJson ) {
            candlesticks.push( new Candlestick( candlestickJson ) );
        }
        return candlesticks;

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
    public async getLastDayTickerStatistics( symbol: string ): Promise< TickerStatistics > {

        return new TickerStatistics( await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V1,
            "ticker/24hr",
            AuthenticationMethod.NONE,
            [ "symbol", symbol ]
        ) );

    }

    /**
     * Interface to the "GET v1/ticker/allPrices" Binance's API operation.
     * Get the latest price for all symbols.
     *
     * @returns A latest prices array for all the symbols.
     */
    public async getLatestPrices(): Promise< LatestPrice[] > {

        let latestPricesJson: any = await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V1,
            "ticker/allPrices",
            AuthenticationMethod.NONE
        );

        let latestPrices: LatestPrice[] = [];
        for( let latestPriceJson of latestPricesJson ) {
            latestPrices.push( new LatestPrice( latestPriceJson ) );
        }
        return latestPrices;

    }

    /**
     * Interface to the "GET v1/ticker/allBookTickers" Binance's API operation.
     * Get the best price/quantity in the order book for all symbols.
     *
     * @returns The best price/quantity in the order book for all symbols.
     */
    public async getTickers(): Promise< Ticker[] > {

        let tickersJson: any = await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V1,
            "ticker/allBookTickers",
            AuthenticationMethod.NONE
        );

        let tickers: Ticker[] = [];
        for( let tickerJson of tickersJson ) {
            tickers.push( new Ticker( tickerJson ) );
        }
        return tickers;

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
    public async placeOrder(
        symbol: string,
        side: OrderSide,
        type: OrderType,
        timeInForce: TimeInForce,
        quantity: number,
        price: number,
        clientOrderId?: string,
        stopPrice?: number,
        icebergQuantity?: number,
        responseType?: ResponseType ): Promise< OrderAcknowledgement | OrderResult | OrderFull > {

        let jsonResponse: any = await this.makeRequest(
            HttpMethod.POST,
            ApiVersion.V3,
            "order",
            AuthenticationMethod.SIGNED,
            [ "symbol", symbol ],
            [ "side", OrderSide[ side ] ],
            [ "type", OrderType[ type ] ],
            [
                "timeInForce",
                type === OrderType.MARKET || type === OrderType.STOP_LOSS ? null : TimeInForce[ timeInForce ]
            ],
            [ "quantity", quantity ],
            [
                "price",
                type === OrderType.MARKET || type === OrderType.STOP_LOSS ? null : price
            ],
            [ "newClientOrderId", clientOrderId ],
            [ "stopPrice", stopPrice ],
            [ "icebergQty", icebergQuantity ],
            [ "newOrderRespType", isNullOrUndefined( responseType ) ? null : ResponseType[ responseType ] ]
        );

        switch( responseType ) {

            case ResponseType.RESULT: {
                return new OrderResult( jsonResponse );
            }
            case ResponseType.FULL: {
                return new OrderFull( jsonResponse );
            }
            default: {
                return new OrderAcknowledgement( jsonResponse );
            }

        }

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
    public async testOrder(
        symbol: string,
        side: OrderSide,
        type: OrderType,
        timeInForce: TimeInForce,
        quantity: number,
        price: number,
        clientId?: string,
        stopPrice?: number,
        icebergQuantity?: number,
        timeout?: number ): Promise< void > {

        await this.makeRequest(
            HttpMethod.POST,
            ApiVersion.V3,
            "order/test",
            AuthenticationMethod.SIGNED,
            [ "symbol", symbol ],
            [ "side", OrderSide[ side ] ],
            [ "type", OrderType[ type ] ],
            [ "timeInForce", TimeInForce[ timeInForce ] ],
            [ "quantity", quantity ],
            [ "price", price ],
            [ "newClientOrderId", clientId ],
            [ "stopPrice", stopPrice ],
            [ "icebergQty", icebergQuantity ],
            [ "recvWindow", timeout ]
        );

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
    public async getOrder(
        symbol: string,
        id?: number,
        clientId?: string,
        timeout?: number ): Promise< Order > {

        return new Order( await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V3,
            "order",
            AuthenticationMethod.SIGNED,
            [ "symbol", symbol ],
            [ "orderId", id ],
            [ "origClientOrderId", clientId ],
            [ "recvWindow", timeout ]
        ) );

    }

    /**
     * Interface to the "DELETE v3/order" Binance's API operation.
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
    public async cancelOrder(
        symbol: string,
        id?: number,
        oldClientId?: string,
        newClientId?: string,
        timeout?: number ): Promise< CanceledOrderData > {

        return new CanceledOrderData( await this.makeRequest(
            HttpMethod.DELETE,
            ApiVersion.V3,
            "order",
            AuthenticationMethod.SIGNED,
            [ "symbol", symbol ],
            [ "orderId", id ],
            [ "origClientOrderId", oldClientId ],
            [ "newClientOrderId", newClientId ],
            [ "recvWindow", timeout ]
        ) );

    }

    /**
     * Interface to the "GET v3/openOrders" Binance's API operation.
     *
     * @param market  The symbol for which we want to retrieve the open orders (if any).
     * @param timeout The request validity maximum time frame (defaults to 5000 ms).
     *
     * @returns An array representing all of the account's open orders.
     */
    public async getOpenOrders( market?: string, timeout?: number ): Promise< Order[] > {

        let openOrdersJson: any = await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V3,
            "openOrders",
            AuthenticationMethod.SIGNED,
            [ "symbol", market ],
            [ "recvWindow", timeout ]
        );

        let openOrders: Order[] = [];
        for( let openOrderJson of openOrdersJson ) {
            openOrders.push( new Order( openOrderJson ) );
        }
        return openOrders;

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
    public async getOrders(
        symbol: string,
        id?: number,
        limit?: number,
        timeout?: number ): Promise< Order[] > {

        let ordersJson: any = await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V3,
            "allOrders",
            AuthenticationMethod.SIGNED,
            [ "symbol", symbol ],
            [ "orderId", id ],
            [ "limit", limit ],
            [ "recvWindow", timeout ]
        );

        let orders: Order[] = [];
        for( let orderJson of ordersJson ) {
            orders.push( new Order( orderJson ) );
        }
        return orders;

    }

    /**
     * Interface to the "GET v3/account" Binance's API operation. Get current
     * account information.
     *
     * @param timeout The request validity maximum time frame (defaults to 5000 ms).
     *
     * @returns The current account information.
     */
    public async getAccountData( timeout?: number ): Promise< AccountData > {

        return new AccountData( await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V3,
            "account",
            AuthenticationMethod.SIGNED,
            [ "recvWindow", timeout ]
        ) );

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
    public async getTrades(
        symbol: string,
        limit?: number,
        fromId?: number,
        timeout?: number ): Promise< Trade[] > {

        let tradesJson: any = await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V3,
            "myTrades",
            AuthenticationMethod.SIGNED,
            [ "symbol", symbol ],
            [ "limit", limit ],
            [ "fromId", fromId ],
            [ "recvWindow", timeout ]
        );

        let trades: Trade[] = [];
        for( let tradeJson of tradesJson ) {
            trades.push( new Trade( tradeJson ) );
        }
        return trades;

    }

    /**
     * Interface to the "POST v1/userDataStream" Binance's API operation.
     * Initializes a new data stream.
     *
     * @returns A listen key to be passed as a parameter when starting a
     *          new data stream.
     */
    public async openUserStream(): Promise< string > {

        return ( await this.makeRequest(
            HttpMethod.POST,
            ApiVersion.V1,
            "userDataStream",
            AuthenticationMethod.API_KEY
        ) ).listenKey;

    }

    /**
     * Interface to the "PUT v1/userDataStream" Binance's API operation.
     * Pings a user data stream in order to prevent a time out.
     *
     * @param streamId A string representing the stream's ID
     *                (returned by [[openUserStream]]).
     */
    public async keepAliveUserStream( streamId: string ): Promise< void > {

        await this.makeRequest(
            HttpMethod.PUT,
            ApiVersion.V1,
            "userDataStream",
            AuthenticationMethod.API_KEY,
            [ "listenKey", streamId ]
        );

    }

    /**
     * Interface to the "DELETE v1/userDataStream" Binance's API operation.
     * Closes out a user data stream.
     *
     * @param streamId A string representing the stream's ID
     *                (returned by [[openUserStream]]).
     */
    public async closeUserStream( streamId: string ): Promise< void > {

        await this.makeRequest(
            HttpMethod.DELETE,
            ApiVersion.V1,
            "userDataStream",
            AuthenticationMethod.API_KEY,
            [ "listenKey", streamId ]
        );

    }

    /**
     * Initializes a web socket data stream that gives us information about a combined
     * stream of an array of symbol's order book updates.
     *
     * @param symbols           The symbols of which we want to get the order book updates.
     * @param onUpdate          A function to be called when a new update is received.
     * @param connectionTimeout Timeout based on which the web socket connection is
     *                          considered to be broken based on a heartbeat monitor.
     * @param onLostConnection  A callback to be invoked when the web socket connection
     *                          is detected as broken.
     */
     public monitorOrderBookCombined(
        symbol: string[],
        onUpdate: ( update: OrderBookUpdate ) => any,
        connectionTimeout: number,
        onLostConnection: () => any ): void {

        let url: string = "";
        url = BinanceApiClient.COMBINED_WS_BASE_URL;
        for ( let s of symbol ) {
            url += s.toLowerCase() + "@depth" + "/";
        }
        // Trim the final slash
        url.slice( 0, -1 );
        const websocket: WebSocket = new WebSocket(
            url,
            { perMessageDeflate: false }
        );

        new HeartbeatHandler(
            websocket,
            isNullOrUndefined( connectionTimeout ) ? BinanceApiClient.DEFAULT_WS_TIMEOUT : connectionTimeout,
            onLostConnection
        ).handle();

        websocket.on( "message", ( data: any ) => {
            // For a combined stream the data is wrapped in an object with the
            // streamname and the raw data.
            const rawData = JSON.parse( data );
            onUpdate( new OrderBookUpdate( rawData.data ) );
        } );

    }
    /**
     * Initializes a web socket data stream that gives us information about a
     * single symbol's order book updates.
     *
     * @param symbol            The symbol of which we want to get the order book updates.
     * @param onUpdate          A function to be called when a new update is received.
     * @param connectionTimeout Timeout based on which the web socket connection is
     *                          considered to be broken based on a heartbeat monitor.
     * @param onLostConnection  A callback to be invoked when the web socket connection
     *                          is detected as broken.
     */
    public monitorOrderBook(
        symbol: string,
        onUpdate: ( update: OrderBookUpdate ) => any,
        connectionTimeout: number,
        onLostConnection: () => any ): void {

        let websocket: WebSocket = new WebSocket(
            BinanceApiClient.WS_BASE_URL + symbol.toLowerCase() + "@depth",
            { perMessageDeflate: false }
        );

        new HeartbeatHandler(
            websocket,
            isNullOrUndefined( connectionTimeout ) ? BinanceApiClient.DEFAULT_WS_TIMEOUT : connectionTimeout,
            onLostConnection
        ).handle();

        websocket.on( "message", ( data: any ) => {
            onUpdate( new OrderBookUpdate( JSON.parse( data ) ) );
        } );

    }

    /**
     * Initializes a web socket data stream that gives us information about
     * Kline/candlestick updates for a number of symbols on the one socket.
     *
     * @param symbols           The symbols of which we want to get the candlestick updates.
     * @param interval          The interval to which the requested candlestick updates
     *                          refer to.
     * @param onUpdate          A function to be called when a new update is received.
     * @param connectionTimeout Timeout based on which the web socket connection is
     *                          considered to be broken based on a heartbeat monitor.
     * @param onLostConnection  A callback to be invoked when the web socket connection
     *                          is detected as broken.
     */
     public async monitorCandlesticksCombined(
         symbols: string[],
         interval: CandlestickInterval,
         onUpdate: ( update: CandlestickUpdate ) => any,
         connectionTimeout?: number,
         onLostConnection?: () => any ): Promise< void > {

         let url: string = "";
         url = BinanceApiClient.COMBINED_WS_BASE_URL;
         for ( let s of symbols ) {
             url += s.toLowerCase() + "@kline_" + interval + "/";
         }
         // Trim the final slash
         url.slice( 0, -1 );
         const websocket: WebSocket = new WebSocket(
             url,
             { perMessageDeflate: false }
         );

         new HeartbeatHandler(
             websocket,
             isNullOrUndefined( connectionTimeout ) ? BinanceApiClient.DEFAULT_WS_TIMEOUT : connectionTimeout,
             onLostConnection
         ).handle();

         websocket.on( "message", ( data: any ) => {
             const rawData = JSON.parse( data );
             onUpdate( new CandlestickUpdate( rawData.data ) );
         } );

    }

    /**
     * Initializes a web socket data stream that gives us information about
     * Kline/candlestick updates.
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
    public async monitorCandlesticks(
        symbol: string,
        interval: CandlestickInterval,
        onUpdate: ( update: CandlestickUpdate ) => any,
        connectionTimeout?: number,
        onLostConnection?: () => any ): Promise< void > {

        let websocket: WebSocket = new WebSocket(
            BinanceApiClient.WS_BASE_URL + symbol.toLowerCase() + "@kline_" + interval,
            { perMessageDeflate: false }
        );

        new HeartbeatHandler(
            websocket,
            isNullOrUndefined( connectionTimeout ) ? BinanceApiClient.DEFAULT_WS_TIMEOUT : connectionTimeout,
            onLostConnection
        ).handle();

        websocket.on( "message", ( data: any ) => {
            onUpdate( new CandlestickUpdate( JSON.parse( data ) ) );
        } );

    }

    /**
     * Initializes a web socket data stream that gives us information about
     * trade updates for a number of symbols on the one socket.
     *
     * @param symbols           The symbols of which we want to get the trade updates.
     * @param onUpdate          A function to be called when a new update is received.
     * @param connectionTimeout Timeout based on which the web socket connection is
     *                          considered to be broken based on a heartbeat monitor.
     * @param onLostConnection  A callback to be invoked when the web socket connection
     *                          is detected as broken.
     */
    public monitorTradesCombined(
         symbols: string[],
         onUpdate: ( update: TradeUpdate ) => any,
         connectionTimeout: number,
         onLostConnection: () => any ): void {
         let url: string = "";
         url = BinanceApiClient.COMBINED_WS_BASE_URL;
         for ( let s of symbols ) {
             url += s.toLowerCase() + "@aggTrade" + "/";
         }
         // Trim the final slash
         url.slice( 0, -1 );
         const websocket: WebSocket = new WebSocket(
             url,
             { perMessageDeflate: false }
         );

         new HeartbeatHandler(
             websocket,
             isNullOrUndefined( connectionTimeout ) ? BinanceApiClient.DEFAULT_WS_TIMEOUT : connectionTimeout,
             onLostConnection
         ).handle();

         websocket.on( "message", ( data: any ) => {
             const rawData = JSON.parse( data );
             onUpdate( new TradeUpdate( rawData.data ) );
         } );

     }


    /**
     * Initializes a web socket data stream that gives us information about
     * trade updates.
     *
     * @param symbol            The symbol of which we want to get the trade updates.
     * @param onUpdate          A function to be called when a new update is received.
     * @param connectionTimeout Timeout based on which the web socket connection is
     *                          considered to be broken based on a heartbeat monitor.
     * @param onLostConnection  A callback to be invoked when the web socket connection
     *                          is detected as broken.
     */
    public monitorTrades(
        symbol: string,
        onUpdate: ( update: TradeUpdate ) => any,
        connectionTimeout: number,
        onLostConnection: () => any ): void {

        let websocket: WebSocket = new WebSocket(
            BinanceApiClient.WS_BASE_URL + symbol.toLowerCase() + "@aggTrade",
            { perMessageDeflate: false }
        );

        new HeartbeatHandler(
            websocket,
            isNullOrUndefined( connectionTimeout ) ? BinanceApiClient.DEFAULT_WS_TIMEOUT : connectionTimeout,
            onLostConnection
        ).handle();

        websocket.on( "message", ( data: any ) => {
            onUpdate( new TradeUpdate( JSON.parse( data ) ) );
        } );

    }

    /**
     * Initializes a web socket data stream that gives us information about
     * the personal account updates.
     *
     * @param listenKey         The listen key returned when a user data stream gets
     *                          initialized by [[openUserStream]].
     * @param onUpdate          A function to be called when a new update is received.
     * @param connectionTimeout Timeout based on which the web socket connection is
     *                          considered to be broken based on a heartbeat monitor.
     * @param onLostConnection  A callback to be invoked when the web socket connection
     *                          is detected as broken.
     */
    public monitorUser(
        listenKey: string,
        onUpdate: ( update: AccountUpdate | OrderUpdate ) => any,
        connectionTimeout: number,
        onLostConnection: () => any ): void {

        let websocket: WebSocket = new WebSocket(
            BinanceApiClient.WS_BASE_URL + listenKey,
            { perMessageDeflate: false }
        );

        new HeartbeatHandler(
            websocket,
            isNullOrUndefined( connectionTimeout ) ? BinanceApiClient.DEFAULT_WS_TIMEOUT : connectionTimeout,
            onLostConnection
        ).handle();

        websocket.on( "message", ( data: any ) => {

            let jsonData = JSON.parse( data );
            switch( jsonData.e ) {

                case "outboundAccountInfo": {
                    onUpdate( new AccountUpdate( jsonData ) );
                    break;
                }
                case "executionReport": {
                    onUpdate( new OrderUpdate( jsonData ) );
                    break;
                }

            }

        } );

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
    private async makeRequest(
        httpMethod: HttpMethod,
        apiVersion: ApiVersion,
        accessedResource: string,
        requiredAuthentication: AuthenticationMethod,
        ...parameters: [ string, any ][] ): Promise< any > {

        let apiUrl: URL = new URL(
            Path.join( "/api", apiVersion, accessedResource ),
            "https://api.binance.com"
        );

        for( let parameter of parameters ) {

            if( isNullOrUndefined( parameter[ 1 ] ) ) {
                continue;
            }
            apiUrl.searchParams.append( parameter[ 0 ], parameter[ 1 ].toString() );

        }

        let headers: any =
            this.setupAuthentication( httpMethod, apiUrl, requiredAuthentication );

        try {

            return await request( {

                method: HttpMethod[ httpMethod ],
                url: apiUrl.href,
                headers: headers,
                json: true

            } );

        }
        catch( error ) {

            throw new ApiError(
                error.error.code,
                error.error.msg
            );

        }

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
    private setupAuthentication(
        httpMethod: HttpMethod,
        apiUrl: URL,
        authenticationMethod: AuthenticationMethod ): any {

        let headers: any = {};
        if( authenticationMethod === AuthenticationMethod.NONE ) {
            return;
        }

        if( isNullOrUndefined( BinanceApiClient.API_KEY ) ) {
            throw new AuthenticationError( httpMethod, apiUrl, authenticationMethod );
        }
        headers[ "X-MBX-APIKEY" ] = BinanceApiClient.API_KEY;

        if( authenticationMethod === AuthenticationMethod.SIGNED ) {

            if( isNullOrUndefined( BinanceApiClient.API_SECRET ) ) {
                throw new AuthenticationError( httpMethod, apiUrl, authenticationMethod );
            }
            apiUrl.searchParams.append( "timestamp", new Date().getTime().toString() );
            apiUrl.searchParams.append(
                "signature",
                CryptoJs.HmacSHA256( apiUrl.searchParams.toString(), BinanceApiClient.API_SECRET ).toString()
            );

        }
        return headers;

    }

}
