import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayMissionsComponent } from './components/display-missions/display-missions.component';
import { RamSelectorComponent } from './components/ram-selector/ram-selector.component';
import { MissionComponent } from './components/mission/mission.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MissionPanelComponent } from './components/mission-panel/mission-panel.component';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';
import { PurchasesComponent } from './components/purchases/purchases.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayMissionsComponent,
    RamSelectorComponent,
    MissionComponent,
    HomeComponent,
    MissionPanelComponent,
    MarketplaceComponent,
    PurchasesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
