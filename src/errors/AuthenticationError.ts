import { AuthenticationMethod } from "../enums/AuthenticationMethod";
import { HttpMethod } from "../enums/HttpMethod";
import { URL } from "url";

export class AuthenticationError extends Error {

    constructor( httpMethod: HttpMethod, apiUrl: URL, requiredAuthentication: AuthenticationMethod ) {

        super(
            `Endpoint [ ${ httpMethod } ]@[ ${ apiUrl.href } ] requires an API key 
            ${ requiredAuthentication == AuthenticationMethod.SIGNED ? "and API secret" : "" } 
            in order to be accessed`
        );

    }

}