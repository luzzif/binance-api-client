import { OrderResult } from "./OrderResult";
import { PlacedOrderFill } from "./PlacedOrderFill";

export class OrderFull {

    private _result: OrderResult;
    private _fills: PlacedOrderFill[];

    constructor( json: any ) {

        this._result = new OrderResult( json );

        this._fills = [];
        for( let jsonFill of json._fills ) {
            this._fills.push( new PlacedOrderFill( jsonFill ) );
        }

    }

    get result(): OrderResult {
        return this._result;
    }

    set result( value: OrderResult ) {
        this._result = value;
    }

    get fills(): PlacedOrderFill[] {
        return this._fills;
    }

    set fills( value: PlacedOrderFill[] ) {
        this._fills = value;
    }

}