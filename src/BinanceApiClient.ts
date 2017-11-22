import { AuthenticationMethod } from "./enums/AuthenticationMethod";
import { ApiVersion } from "./enums/ApiVersion";
import * as CryptoJs from "crypto-js";
import { HttpMethod } from "./enums/HttpMethod";
import { AuthenticationError } from "./errors/AuthenticationError";
import * as requestPromise from "request-promise";
import * as Path from "path";
import { isNullOrUndefined } from "util";
import { URL } from "url";
import { OrderBook } from "./models/OrderBook";
import { ApiError } from "./errors/ApiError";
import { OpenOrder } from "./models/OpenOrder";
import { CandlestickInterval } from "./enums/CandlestickInterval";
import { Candlestick } from "./models/Candlestick";
import { TickerStatistics } from "./models/TickerStatistics";
import { LatestPrice } from "./models/LatestPrice";
import { Ticker } from "./models/Ticker";
import { OrderSide } from "./enums/OrderSide";
import { OrderType } from "./enums/OrderType";
import { TimeInForce } from "./enums/TimeInForce";
import { PlacedOrderData } from "./models/PlacedOrderData";

/**
 * Represents a single Binance API client.
 */
export class BinanceApiClient {

    /**
     * The Binance's personal API key.
     */
    private readonly apiKey: string;

    /**
     * The Binance's personal API secret.
     */
    private readonly apiSecret: string;

    /**
     * Initializes a new Binance API client.
     *
     * @param apiKey    The personal account API key.
     * @param apiSecret The personal account API secret.
     */
    constructor( apiKey?: string, apiSecret?: string ) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    /**
     * Interface to the "v1/ping" Binance's API operation.
     */
    public async ping(): Promise< void > {

        await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V1,
            "ping",
            AuthenticationMethod.NONE
        );

    }

    /**
     * Interface to the "v1/time" Binance's API operation.
     *
     * @returns Either a promise of the Binance's server time, or
     *          the Binance's server time if using the await construct.
     */
    public async getServerTime(): Promise< number > {

        return ( await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V1,
            "time",
            AuthenticationMethod.NONE
        ) ).serverTime;

    }

    /**
     * Interface to the "v1/depth" Binance's API operation.
     *
     * @param symbol The symbol for which we want to retrieve the order book.
     * @param limit  The maximum number of orders in the returned order book.
     *
     * @returns Either a promise of the order book for the given coin, with
     *          the order book elements limited to the specified value, or
     *          the unwrapped order book respecting the same constraints if
     *          using the await construct.
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
     * Interface to the "v1/klines" Binance's API operation. Get
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
     * @returns Either a promise of a candlesticks array or the unwrapped
     *          candlesticks array if using the await construct.
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
     * Interface to the "v1/ticker/24hr" Binance's API operation.
     * Get last 24 hours price change statistics.
     *
     * @param symbol The symbol for which we want to retrieve the
     *               last day ticker statistics.
     *
     * @returns Either a promise of the last day ticker statistics
     *          or the unwrapped ticker statistics if using
     *          the await construct.
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
     * Interface to the "v1/ticker/allPrices" Binance's API operation.
     * Get the latest price for all symbols.
     *
     * @returns Either a promise of a last price array or the unwrapped
     *          last price array if using the await construct.
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
     * Interface to the "v1/ticker/allBookTickers" Binance's API operation.
     * Get the best price/quantity in the order book for all symbols.
     *
     * @returns Either a promise of a ticker array or the unwrapped ticker
     *          array if using the await construct.
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
     * Interface to the "v3/order" Binance's API operation. Places a new order
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
     *
     * @returns Either a promise of a placed order data or
     *          the unwrapped placed order data if using the
     *          await construct.
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
        icebergQuantity?: number ): Promise< PlacedOrderData[] > {

        return new PlacedOrderData( await this.makeRequest(
            HttpMethod.POST,
            ApiVersion.V3,
            "order",
            AuthenticationMethod.SIGNED,
            [ "symbol", symbol ],
            [ "side", side ],
            [ "type", type ],
            [ "timeInForce", timeInForce ],
            [ "quantity", quantity ],
            [ "price", price ],
            [ "newClientOrderId", clientOrderId ],
            [ "stopPrice", stopPrice ],
            [ "icebergQty", icebergQuantity ]
        ) );

    }

    /**
     * Interface to the "v3/openOrders" Binance's API operation.
     *
     * @param market  The symbol for which we want to retrieve the open orders (if any).
     * @param timeout The request validity maximum time frame (defaults to 5000 ms).
     *
     * @returns Either a promise of an open order array for the given coin or
     *          the unwrapped open order array if using the await construct.
     */
    public async getOpenOrders( market: string, timeout?: number ): Promise< OpenOrder[] > {

        let openOrdersJson: any = await this.makeRequest(
            HttpMethod.GET,
            ApiVersion.V3,
            "openOrders",
            AuthenticationMethod.SIGNED,
            [ "symbol", market ],
            [ "recvWindow", timeout ]
        );

        let openOrders: OpenOrder[] = [];
        for( let openOrderJson of openOrdersJson ) {
            openOrders.push( new OpenOrder( openOrderJson ) );
        }
        return openOrders;

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

            return await requestPromise( {

                method: HttpMethod[ httpMethod ],
                url: apiUrl.href,
                headers: headers,
                json: true,
                fullResponse: false

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

        if( isNullOrUndefined( this.apiKey ) ) {
            throw new AuthenticationError( httpMethod, apiUrl, authenticationMethod );
        }
        headers[ "X-MBX-APIKEY" ] = this.apiKey;

        if( authenticationMethod === AuthenticationMethod.SIGNED ) {

            if( isNullOrUndefined( this.apiSecret ) ) {
                throw new AuthenticationError( httpMethod, apiUrl, authenticationMethod );
            }
            apiUrl.searchParams.append( "timestamp", new Date().getTime().toString() );
            apiUrl.searchParams.append(
                "signature",
                CryptoJs.HmacSHA256( apiUrl.searchParams.toString(), this.apiSecret )
            );

        }
        return headers;

    }

}