import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMission } from '../../../app/models/IMission';
@Component({
  selector: 'mission-panel',
  templateUrl: './mission-panel.component.html',
  styleUrls: ['./mission-panel.component.scss']
})
export class MissionPanelComponent implements OnInit {
  public missions: Array<IMission> = [
    {
      id: -1,
      title: "5 Kaiju Kingz NFT",
      description: "this will be the best mission you've ever been a part of...",
      imageUrl: "../../assets/images/kaiju.gif",
      startDate: new Date(),
      endDate: new Date()
    },
    {
      id: -2,
      title: "5 Kaiju Kingz NFT",
      description: "this will be the best mission you've ever been a part of...",
      imageUrl: "../../assets/images/kaiju.gif",
      startDate: new Date(),
      endDate: new Date()
    },
    {
      id: -3,
      title: "5 Kaiju Kingz NFT",
      description: "this will be the best mission you've ever been a part of...",
      imageUrl: "../../assets/images/kaiju.gif",
      startDate: new Date(),
      endDate: new Date()
    }
  ];
  @Input('displayMode') displayMode : "Available" | "In Progress" | "My Missions" = "Available";
  @Output() missionSelected: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {

  }

  missionClick(mission : IMission) {
    this.missionSelected.emit(mission);
    console.log(mission);
  }
}


