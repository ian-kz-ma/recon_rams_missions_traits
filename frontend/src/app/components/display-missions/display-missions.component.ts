import { Component, OnInit } from '@angular/core';
import { IMission } from '../../../app/models/IMission';

@Component({
  selector: 'display-missions',
  templateUrl: './display-missions.component.html',
  styleUrls: ['./display-missions.component.scss']
})
export class DisplayMissionsComponent implements OnInit {
  public displayMode: "Missions" | "SelectedMission" = "Missions";
  public displayText: string = "";
  public i: any = 0;
  public selectedMission: IMission = {
    id: -1,
    title: "",
    description: "",
    endDate: new Date(),
    startDate: new Date(),
    imageUrl: ""
  }
  constructor() { }

  ngOnInit(): void {
  }
  selectedMissionEventHandler(mission: IMission) {
    this.displayMode = "SelectedMission";
    this.selectedMission = mission;
    // this.typeWriter();
  }
  displayMissions() {
    this.displayMode = "Missions";
    this.selectedMission = {
      id: -1,
      title: "",
      description: "",
      endDate: new Date(),
      startDate: new Date(),
      imageUrl: ""
    };
  }

  async typeWriter() {
    if (this.i < this.selectedMission.description.length) {
      console.log(this.displayText);
      this.displayText = this.displayText + this.selectedMission.description.charAt(this.i);
      this.i++;
    
      await setTimeout(this.typeWriter, 1000);
    }
  }
}

