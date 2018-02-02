/**
 * Represents a single balance.
 */
export class Balance {

    private _asset: string;
    private _available: number;
    private _locked: number;


    constructor( json: any ) {

        this._asset = json.asset || json.a;
        this._available = json.free || json.available || json.f;
        this._locked = json.locked || json.l;

    }

    get asset(): string {
        return this._asset;
    }

    set asset( value: string ) {
        this._asset = value;
    }

    get available(): number {
        return this._available;
    }

    set available( value: number ) {
        this._available = value;
    }

    get locked(): number {
        return this._locked;
    }

    set locked( value: number ) {
        this._locked = value;
    }

}