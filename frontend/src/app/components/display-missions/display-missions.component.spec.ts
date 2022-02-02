import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMissionsComponent } from './display-missions.component';

describe('DisplayMissionsComponent', () => {
  let component: DisplayMissionsComponent;
  let fixture: ComponentFixture<DisplayMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
