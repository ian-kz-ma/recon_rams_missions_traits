import { Component, OnInit, OnChanges } from '@angular/core';
import { combineLatest } from 'rxjs';
import { IListing } from 'src/app/models/IListing';
import { IPurchase } from 'src/app/models/IPurchase';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MarketplaceService } from 'src/app/services/marketplace/marketplace.service';

@Component({
  selector: 'marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {

  public listings: Array<IListing> = [];
  public promptForBuy: boolean = false;
  public buySuccess: boolean = false;
  public buyFail: boolean = false;
  public buyListing: any;
  private _user: any;
  public get user(): any {
    if (!this._user) {
      this._user = this.authService.user;
    }
    return this._user;
  }
  public set user(v: any) {
    this._user = v;
  }

  constructor(private marketplaceService: MarketplaceService, private authService: AuthService) {
  }

  ngOnInit(loop: boolean = true): void {
    this.marketplaceService.getListings().subscribe(listings => {
      this.listings = listings;
      this.marketplaceService.listingsArray = listings;
    });
    this.marketplaceService.getPurchases().subscribe((purchases: Array<any>) => {
      this.marketplaceService.purchasesArray = [];
      if (!!this.authService.user) {
        this.authService.user.purchases = [];
        purchases.forEach(purchase => {
          this.marketplaceService.purchasesArray.push(purchase);
          if (purchase.wallet == this.authService.user.wallet) {
            this.authService.user.purchases.push(purchase.listing_id);
          }
        })
      }
      else {
        purchases.forEach((purchase: IPurchase) => {
          this.marketplaceService.purchasesArray.push(purchase);
        });
      }
    });
    if (loop) {
      setTimeout(() => {
        this.ngOnInit();
      }, 5000);
    }

  }

  async openMetaMask() {
    this.authService.getNonce();
  }
  promptToBuyItem(listingId: string) {
    let listing: any = this.listings.find(x => { return x.id == listingId });
    this.buyListing = listing;
    this.promptForBuy = true;


   

    // this.listings.find(x => x.id = listingId) = listing.current_stock-1;
  }

  callBuy(listing : any) {
    this.promptForBuy = false;
    this.marketplaceService.buy(listing.id).subscribe(x => {
      console.log(x);
      if (x == true) {
        console.log("buy succeeded");
        this.buySuccess = true;
        listing.current_stock--;
        let purchases = this.user.purchases;
        this.user.token_balance = this.user.token_balance - listing.price;
        this.authService.getUser(this.authService.wallet).subscribe((x : any) => {
          x.purchases = purchases;
          this.user = x;
          this.authService.user = x;
        });
      }
      else {
        this.buyFail = true;
        console.log("buy failed");
      }

    });
  }
}
