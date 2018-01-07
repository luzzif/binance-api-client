/**
 * Represents a single placed order fill.
 */
export class PlacedOrderFill {

    private _price: number;
    private _quantity: number;
    private _commission: number;
    private _commissionAsset: string;

    constructor( json: any ) {

        this._quantity = json.qty;
        this._price = json.price;
        this._commission = json.commission;
        this._commissionAsset = json.commissionAsset;

    }

    get price(): number {
        return this._price;
    }

    set price( value: number ) {
        this._price = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity( value: number ) {
        this._quantity = value;
    }

    get commission(): number {
        return this._commission;
    }

    set commission( value: number ) {
        this._commission = value;
    }

    get commissionAsset(): string {
        return this._commissionAsset;
    }

    set commissionAsset( value: string ) {
        this._commissionAsset = value;
    }

}