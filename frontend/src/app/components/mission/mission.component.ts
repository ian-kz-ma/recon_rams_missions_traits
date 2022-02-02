import { Component, OnInit } from '@angular/core';
import { ITest, TestService as TestService } from '../../../app/services/test.service';
@Component({
  selector: 'mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {

  test: ITest | undefined;
  placeholder: IPlaceHolder | undefined;

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




interface IPlaceHolder {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}