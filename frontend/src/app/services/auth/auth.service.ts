import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  
  
  
  public async getNonce() {
    if((window as any).ethereum.isMetaMask) {
      await (window as any).ethereum.enable();
      let wallets : Array<string> = await (window as any).ethereum.request({method: 'eth_requestAccounts' });
      console.log(wallets);
      //Make call to backend to get nonce
    }

  }
}


