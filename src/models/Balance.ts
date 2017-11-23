/**
 * Represents a single balance.
 */
export class Balance {

    private _asset: string;
    private _free: number;
    private _locked: number;


    constructor( json: any ) {

        this._asset = json.asset;
        this._free = json.free;
        this._locked = json.locked;

    }

    get asset(): string {
        return this._asset;
    }

    set asset( value: string ) {
        this._asset = value;
    }

    get free(): number {
        return this._free;
    }

    set free( value: number ) {
        this._free = value;
    }

    get locked(): number {
        return this._locked;
    }

    set locked( value: number ) {
        this._locked = value;
    }

}