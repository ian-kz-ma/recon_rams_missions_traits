import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { IPurchase } from 'src/app/models/IPurchase';
import { IListing } from '../../models/IListing';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  listingsArray: Array<IListing> = [];
  purchasesArray: Array<IPurchase> = [];
  
  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

 buy(listingId: string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.authService.token.token);
   return  this.httpClient.put(`http://localhost:8080/api/marketplace/buy/${listingId}/${this.authService.user.wallet}`, {}, { headers: headers });
    
  }
  getListings() {
    return this.httpClient.get<Array<IListing>>(`http://localhost:8080/api/marketplace/listings`);
  }
  getPurchases() {
    return this.httpClient.get<Array<IPurchase>>(`http://localhost:8080/api/marketplace/purchases`);
  }
}
