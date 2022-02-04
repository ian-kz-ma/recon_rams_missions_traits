import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    DisplayMissionsComponent,
    RamSelectorComponent,
    MissionComponent,
    HomeComponent,
    MissionPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
