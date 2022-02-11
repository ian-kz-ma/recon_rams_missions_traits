import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'express';
import { IUser } from 'src/app/models/IUser';
import { __await } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: any = { token: "" };
  public user: any;
  public wallet: string = "";
  public state: "CONNECTED" | "NOT CONNECTED" = "NOT CONNECTED";
  constructor(private httpClient: HttpClient) { }



  public async getNonce() {
    if (!!(window as any).ethereum && (window as any).ethereum.isMetaMask) {
      let wallets: Array<string> = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      console.log(wallets[0]);
      this.wallet = wallets[0];
      let nonce: string = "";
      //Make call to backend to get nonce
      this.httpClient.post("http://localhost:8080/api/auth/getNonce/" + wallets[0], {}).subscribe(async (result: any) => {
        console.log(result.nonce);
        console.log({
          method: 'personal_sign',
          params: [(`0x${this.toHex(result.nonce)}` as string), (wallets[0] as string)]
        });
        let signedMsg = await (window as any).ethereum.request({
          method: 'personal_sign',
          params: [(`0x${this.toHex(result.nonce)}` as string), (wallets[0] as string)]
        });
        console.log(signedMsg);

        //make call to verify signed msg and get session token
        await this.httpClient.get(`http://localhost:8080/api/auth/verifySignedMsg/${wallets[0]}/${signedMsg}`).subscribe(async (token) => {
          this.token = token;
          this.getUser(this.wallet).subscribe(x => {

            this.user = x;
            this.state = "CONNECTED";
          });

        })
      });
    }
    else {
      console.log("install metamask");
    }
  }

  public getUser(wallet: string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token.token);
    return this.httpClient.get(`http://localhost:8080/api/auth/getUser/${wallet}`, { headers: headers });
  }

  private toHex(stringToConvert: string): string {
    return stringToConvert
      .split('')
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  }
}


