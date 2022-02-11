import { Component, ViewChild } from '@angular/core';
import { userInfo } from 'os';
import { TestScheduler } from 'rxjs/testing';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import { IPurchase } from './models/IPurchase';
import { AuthService } from './services/auth/auth.service';
import { MarketplaceService } from './services/marketplace/marketplace.service';
import { TestService } from './services/test/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Recon Rams';
  selectedPage: string = "Home";
  pages: Array<string> = ["Home", "Missions", "Evolve", "Marketplace", "Purchases"];

  @ViewChild("market", { static: false }) market: any;
  constructor(public authService: AuthService, private marketplaceService: MarketplaceService, private testService: TestService
  ) {


  }
  ngOnInit() {
    this.marketplaceService.getListings().subscribe(listings => {

      this.marketplaceService.listingsArray = listings
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
  async openMetaMask() {
    this.authService.getNonce();
  }

  // web3.eth.coinbase
  // console.log(window.ethereum.isMetaMask)
  // window.ethereum.request({ method: 'eth_requestAccounts' }).subscribe();
  // this.web3service.openMetamask().then(resp =>{
  //     console.log(resp);
  // })
  async getTest() {
    this.testService.getTest(1).subscribe(x => {
      console.log(x);
    })
  }
  public navClick(page: string) {
    this.selectedPage = page;
    console.log(this.selectedPage);
  }
}


