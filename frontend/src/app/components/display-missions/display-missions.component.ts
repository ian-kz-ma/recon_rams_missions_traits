import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'display-missions',
  templateUrl: './display-missions.component.html',
  styleUrls: ['./display-missions.component.scss']
})
export class DisplayMissionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

interface IMission {
  title: string,
  description: string,
  
}