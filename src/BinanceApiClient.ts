import { AuthenticationMethod } from "./enums/AuthenticationMethod";
import { ApiVersion } from "./enums/ApiVersion";
import * as CryptoJs from "crypto-js";
import { HttpMethod } from "./enums/HttpMethod";
import { AuthenticationError } from "./errors/AuthenticationError";
import * as requestPromise from "request-promise";
import * as Path from "path";
import { isNullOrUndefined } from "util";
import { URL } from "url";

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
        ...parameters: [ string, string ][] ): Promise< any > {

        let apiUrl: URL = new URL(
            Path.join( "/api", apiVersion, accessedResource ),
            "https://api.binance.com"
        );

        for( let parameter of parameters ) {

            if( isNullOrUndefined( parameter[ 1 ] ) ) {
                continue;
            }
            baseUrl.searchParams.append( parameter[ 0 ], parameter[ 1 ] );

        }

        let headers: any =
            this.setupAuthentication( httpMethod, apiUrl, requiredAuthentication );

        return await requestPromise( {

            method: HttpMethod[ httpMethod ],
            url: apiUrl.href,
            headers: headers,
            json: true,
            fullResponse: false

        } );

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
        switch( authenticationMethod ) {

            case AuthenticationMethod.API_KEY: {

                if( isNullOrUndefined( this.apiKey ) ) {
                    throw new AuthenticationError( httpMethod, apiUrl, authenticationMethod );
                }
                headers[ "X-MBX-APIKEY" ] = this.apiKey;
                break;

            }
            case AuthenticationMethod.SIGNED: {

                if( isNullOrUndefined( this.apiKey ) || isNullOrUndefined( this.apiSecret ) ) {
                    throw new AuthenticationError( httpMethod, apiUrl, authenticationMethod );
                }
                apiUrl.searchParams.append( "timestamp", new Date().getDay().toString() );
                apiUrl.searchParams.append(
                    "signature",
                    CryptoJs.HmacSHA256( apiUrl.searchParams.toString(), this.apiSecret )
                );

            }

        }
        return headers;

    }

}