/**
 * Represents a single account data
 */
import { Balance } from "./Balance";

export class AccountData {
    private _makerCommission: number;
    private _takerCommission: number;
    private _buyerCommission: number;
    private _sellerCommission: number;
    private _canTrade: boolean;
    private _canWithdraw: boolean;
    private _canDeposit: boolean;
    private _balances: Balance[];

    constructor(json: any) {
        this._makerCommission = json.makerCommission;
        this._takerCommission = json.takerCommission;
        this._buyerCommission = json.buyerCommission;
        this._sellerCommission = json.sellerCommission;
        this._canTrade = json.canTrade;
        this._canWithdraw = json.canWithdraw;
        this._canDeposit = json.canDeposit;

        this._balances = [];
        for (const balanceJson of json.balances) {
            this._balances.push(new Balance(balanceJson));
        }
    }

    get makerCommission(): number {
        return this._makerCommission;
    }

    set makerCommission(value: number) {
        this._makerCommission = value;
    }

    get takerCommission(): number {
        return this._takerCommission;
    }

    set takerCommission(value: number) {
        this._takerCommission = value;
    }

    get buyerCommission(): number {
        return this._buyerCommission;
    }

    set buyerCommission(value: number) {
        this._buyerCommission = value;
    }

    get sellerCommission(): number {
        return this._sellerCommission;
    }

    set sellerCommission(value: number) {
        this._sellerCommission = value;
    }

    get canTrade(): boolean {
        return this._canTrade;
    }

    set canTrade(value: boolean) {
        this._canTrade = value;
    }

    get canWithdraw(): boolean {
        return this._canWithdraw;
    }

    set canWithdraw(value: boolean) {
        this._canWithdraw = value;
    }

    get canDeposit(): boolean {
        return this._canDeposit;
    }

    set canDeposit(value: boolean) {
        this._canDeposit = value;
    }

    get balances(): Balance[] {
        return this._balances;
    }

    set balances(value: Balance[]) {
        this._balances = value;
    }
}
