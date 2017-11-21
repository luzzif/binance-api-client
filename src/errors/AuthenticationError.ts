import { AuthenticationMethod } from "../enums/AuthenticationMethod";
import { HttpMethod } from "../enums/HttpMethod";
import { URL } from "url";

/**
 * Thrown when the API key, API secret or both parameters are found to be
 * null or undefined, but are needed in order to set up the request to access
 * a specific resource.
 */
export class AuthenticationError extends Error {

    constructor( httpMethod: HttpMethod, apiUrl: URL, requiredAuthentication: AuthenticationMethod ) {

        super(
            "Endpoint [ " + HttpMethod[ httpMethod ] + " ]@[ " + apiUrl.href.split( "?" )[ 0 ] + " ] requires " +
            "an API key " + ( requiredAuthentication == AuthenticationMethod.SIGNED ? "and API secret " : "" ) +
            "in order to be accessed"
        );

    }

}