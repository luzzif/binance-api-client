/**
 * Represents a single account update.
 */
import { Balance } from "../../account/Balance";

export class AccountUpdate {

    private _timestamp: Date;
    private _balances: Balance[];

    constructor( json: any ) {

        this._timestamp = new Date( json.E );

        this._balances = [];
        for( let balanceJson of json.B ) {
            this._balances.push( new Balance( balanceJson ) );
        }

    }

    get timestamp(): Date {
        return this._timestamp;
    }

    set timestamp( value: Date ) {
        this._timestamp = value;
    }

    get balances(): Balance[] {
        return this._balances;
    }

    set balances( value: Balance[] ) {
        this._balances = value;
    }

}