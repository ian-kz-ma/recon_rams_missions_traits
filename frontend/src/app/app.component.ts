import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Recon Rams';
  selectedPage : string = "Home";
  pages : Array<string>  = ["Home", "Missions", "Evolve", "Team"];



  public navClick(page : string) {
    this.selectedPage = page;
    console.log(this.selectedPage);
  }
}


