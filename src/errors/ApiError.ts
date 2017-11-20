export class ApiError extends Error {

    constructor( code: number, message: string ) {
        super( "Error code: " + code + ", message: " + message );
    }

}