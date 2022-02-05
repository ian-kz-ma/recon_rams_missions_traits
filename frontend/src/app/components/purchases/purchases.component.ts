import { Component, OnInit } from '@angular/core';
import { IListing } from 'src/app/models/IListing';

@Component({
  selector: 'purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {



  
  private _selectedListing : any;
  public get selectedListing() : any {
    return this._selectedListing;
  }
  public set selectedListing(val : any) {

    if(!!val && (val as IListing).collectedWallets.length < (val as IListing).initStock) { 
      for(let i : number = (val as IListing).collectedWallets.length; i < (val as IListing).initStock; i++ ) {
        (val as IListing).collectedWallets.push("");
      }

    }
    this._selectedListing = val;
  }
  
  listings: Array<IListing> = [{
    id: 1,
    name: "WGMI Studios WL",
    description: "Non-Fungible News | All-in-One Media Outlet Featuring Curated NFT Content",
    initStock: 5,
    currentStock: 3,
    cost: 50000,
    imageUrl: "../../assets/images/wgmi.jpg",
    collectedWallets: ["0xC5A07c29a71db1a8AdB7FE8011608074DC64E94f", "0xC5A07c29a71db1a8AdB7FE8011608074DC64E94f"]

  },
  {
    id:2,
    name: "WGMI Studios WL",
    description: "Non-Fungible News | All-in-One Media Outlet Featuring Curated NFT Content",
    initStock: 20,
    currentStock: 10,
    cost: 50000,
    imageUrl: "../../assets/images/wgmi.jpg",
    collectedWallets: []

  },
  {
    id:2,
    name: "WGMI Studios WL",
    description: "Non-Fungible News | All-in-One Media Outlet Featuring Curated NFT Content",
    initStock: 5,
    currentStock: 5,
    cost: 50000,
    imageUrl: "../../assets/images/wgmi.jpg",
    collectedWallets: []

  },{
    id:2,
    name: "WGMI Studios WL",
    description: "Non-Fungible News | All-in-One Media Outlet Featuring Curated NFT Content",
    initStock: 5,
    currentStock: 5,
    cost: 50000,
    imageUrl: "../../assets/images/wgmi.jpg",
    collectedWallets: []

  },{
    id:2,
    name: "WGMI Studios WL",
    description: "Non-Fungible News | All-in-One Media Outlet Featuring Curated NFT Content",
    initStock: 5,
    currentStock: 5,
    cost: 50000,
    imageUrl: "../../assets/images/wgmi.jpg",
    collectedWallets: []

  },{
    id:2,
    name: "WGMI Studios WL",
    description: "Non-Fungible News | All-in-One Media Outlet Featuring Curated NFT Content",
    initStock: 5,
    currentStock: 5,
    cost: 50000,
    imageUrl: "../../assets/images/wgmi.jpg",
    collectedWallets: []

  },{
    id:2,
    name: "WGMI Studios WL",
    description: "Non-Fungible News | All-in-One Media Outlet Featuring Curated NFT Content",
    initStock: 5,
    currentStock: 5,
    cost: 50000,
    imageUrl: "../../assets/images/wgmi.jpg",
    collectedWallets: []

  },{
    id:2,
    name: "WGMI Studios WL",
    description: "Non-Fungible News | All-in-One Media Outlet Featuring Curated NFT Content",
    initStock: 5,
    currentStock: 5,
    cost: 50000,
    imageUrl: "../../assets/images/wgmi.jpg",
    collectedWallets: []

  },{
    id:2,
    name: "WGMI Studios WL",
    description: "Non-Fungible News | All-in-One Media Outlet Featuring Curated NFT Content",
    initStock: 5,
    currentStock: 5,
    cost: 50000,
    imageUrl: "../../assets/images/wgmi.jpg",
    collectedWallets: []

  },{
     id:2,
    name: "Kaiju Kingz WL",
    description: "3,333 Genesis Kaiju Kingz created by Augminted Labs to protect the metaverse. The community is all about growth and providing a place for the future of web3 to learn, build, and conquer. Join the Kingz and live forever as a legend. 6666 babies to accompany them.",
    initStock: 5,
    currentStock: 0,
    cost: 50000,
    imageUrl: "../../assets/images/kaiju.gif",
    collectedWallets: []

  },{
    id:2,
    name: "WGMI Studios WL",
    description: "Non-Fungible News | All-in-One Media Outlet Featuring Curated NFT Content",
    initStock: 5,
    currentStock: 5,
    cost: 50000,
    imageUrl: "../../assets/images/wgmi.jpg",
    collectedWallets: []

  },{
    id:2,
    name: "WGMI Studios WL",
    description: "Non-Fungible News | All-in-One Media Outlet Featuring Curated NFT Content",
    initStock: 5,
    currentStock: 0,
    cost: 50000,
    imageUrl: "../../assets/images/wgmi.jpg",
    collectedWallets: []

  },{
    id:2,
    name: "WGMI Studios WL",
    description: "Non-Fungible News | All-in-One Media Outlet Featuring Curated NFT Content",
    initStock: 5,
    currentStock: 5,
    cost: 50000,
    imageUrl: "../../assets/images/wgmi.jpg",
    collectedWallets: []

  },{
    id:2,
    name: "WGMI Studios WL",
    description: "Non-Fungible News | All-in-One Media Outlet Featuring Curated NFT Content",
    initStock: 5,
    currentStock: 5,
    cost: 50000,
    imageUrl: "../../assets/images/wgmi.jpg",
    collectedWallets: []

  },
];
  constructor() { }

  ngOnInit(): void {
    this.selectedListing = this.listings[0];
  }

}
