"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
const AuthenticationMethod_1 = require("../enums/AuthenticationMethod");
const HttpMethod_1 = require("../enums/HttpMethod");
/**
 * Thrown when the API key, API secret or both parameters are found to be
 * null or undefined, but are needed in order to set up the request to access
 * a specific resource.
 */
class AuthenticationError extends Error {
    constructor(httpMethod, apiUrl, requiredAuthentication) {
        super("Endpoint [ " +
            HttpMethod_1.HttpMethod[httpMethod] +
            " ]@[ " +
            apiUrl.href.split("?")[0] +
            " ] requires " +
            "an API key " +
            (requiredAuthentication == AuthenticationMethod_1.AuthenticationMethod.SIGNED
                ? "and API secret "
                : "") +
            "in order to be accessed");
    }
}
exports.AuthenticationError = AuthenticationError;
//# sourceMappingURL=AuthenticationError.js.map