import { Component } from '@angular/core';
declare let window: any;
declare let web3: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Recon Rams';
  selectedPage: string = "Home";
  pages: Array<string> = ["Home", "Missions", "Evolve", "Marketplace", "Purchases"];

  constructor() {


  }
  ngOnInit() {
   
  }
  async openMetaMask() {
    web3.eth.coinbase
    console.log(window.ethereum.isMetaMask)
    window.ethereum.request({ method: 'eth_requestAccounts' }).subscribe();
    // this.web3service.openMetamask().then(resp =>{
    //     console.log(resp);
    // })
  }

  public navClick(page: string) {
    this.selectedPage = page;
    console.log(this.selectedPage);
  }
}


