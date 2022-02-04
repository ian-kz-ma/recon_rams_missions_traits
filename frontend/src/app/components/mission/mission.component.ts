import { Component, OnInit } from '@angular/core';
import {TestService as TestService } from '../../../app/services/test.service';
import { ITest } from '../../models/ITest';
@Component({
  selector: 'mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  test: ITest | undefined;

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.showTest(1);
  }

  showTest(id: number) {
    this.testService.getTest(id).subscribe((data: ITest) => { 
      this.test = {
      id: (data as any).id,
      name: (data as any).name,
      age: (data as any).age
      }
      console.log(this.test);
    });
  }

}




