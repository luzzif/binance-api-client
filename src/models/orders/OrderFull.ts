import { OrderResult } from "./OrderResult";
import { PlacedOrderFill } from "./PlacedOrderFill";

export class OrderFull {

    private result: OrderResult;
    private fills: PlacedOrderFill[];

    constructor( json: any ) {

        this.result = new OrderResult( json );

        this.fills = [];
        for( let jsonFill of json.fills ) {
            this.fills.push( new PlacedOrderFill( jsonFill ) );
        }

    }

}