import * as internal from "stream";

export interface IUser {
    wallet: string,
    nonce: string,
    token_balance: number,
    rams_owned: Array<any>
}