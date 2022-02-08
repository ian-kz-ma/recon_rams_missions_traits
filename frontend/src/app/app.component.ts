import { Component } from '@angular/core';
// import { Web3Service } from './services/web3/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Recon Rams';
  selectedPage : string = "Home";
  pages : Array<string>  = ["Home", "Missions", "Evolve", "Marketplace", "Purchases"];

  constructor() {

  }
  openMetaMask(){
    // this.web3service.openMetamask().then(resp =>{
    //     console.log(resp);
    // })
  }

  public navClick(page : string) {
    this.selectedPage = page;
    console.log(this.selectedPage);
  }
}


