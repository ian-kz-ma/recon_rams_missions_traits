import { Component, OnInit } from '@angular/core';
import { IListing } from 'src/app/models/IListing';
import { IPurchase } from 'src/app/models/IPurchase';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MarketplaceService } from 'src/app/services/marketplace/marketplace.service';
import { MarketplaceComponent } from '../marketplace/marketplace.component';

@Component({
  selector: 'purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {




  private _selectedListing: any;
  public get selectedListing(): any {
    return this._selectedListing;
  }
  public set selectedListing(val: any) {
    this._selectedListing = val;
    this._purchasesToDisplay = this.marketplaceService.purchasesArray.filter(purchase => purchase.listing_id == this.selectedListing.id);
  }

  public get listings(): Array<IListing> {
    return this.marketplaceService.listingsArray;
  }

  private _purchasesToDisplay: any;
  public get purchasesToDisplay(): any {
    if (!this._purchasesToDisplay) {
      this._purchasesToDisplay = this.marketplaceService.purchasesArray.filter(purchase => purchase.listing_id == this.selectedListing.id);
    }
    let tempArr = this._purchasesToDisplay;
    for (let i = this._purchasesToDisplay.length; i < this.selectedListing.init_stock; i++) {
      tempArr.push({});
    }
    return tempArr;
  }
  public set purchasesToDisplay(v: any) {
    this._purchasesToDisplay = v;
  }
  // public get purchasesToDisplay(): Array<any> {
  //   let purchases: Array<any> = this.marketplaceService.purchasesArray.filter(purchase => purchase.listing_id == this.selectedListing.id);
  //   let tempArr = purchases;
  //   for (let i = purchases.length; i < this.selectedListing.init_stock; i++) {
  //     tempArr.push({});
  //   }
  //   return tempArr;
  // }
  // public get purchases(): Array<IPurchase>  {
  //   return this.marketplaceService.purchasesArray;

  // }
  constructor(private marketplaceService: MarketplaceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.selectedListing = this.listings[0];
    this.marketplaceService.getListings().subscribe(x => {
      this.marketplaceService.listingsArray = x;
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
  }

}
