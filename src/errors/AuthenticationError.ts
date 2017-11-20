import { AuthenticationMethod } from "../enums/AuthenticationMethod";
import { HttpMethod } from "../enums/HttpMethod";
import { URL } from "url";

export class AuthenticationError extends Error {

    constructor( httpMethod: HttpMethod, apiUrl: URL, requiredAuthentication: AuthenticationMethod ) {

        super(
            `Tried to access endpoint [ ${ httpMethod } ]@[ ${ apiUrl.href } ] without authentication. 
            An API key ${ requiredAuthentication == AuthenticationMethod.SIGNED ? "and API secret are" : "is " } 
            needed.`
        );

    }

}