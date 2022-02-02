import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamSelectorComponent } from './ram-selector.component';

describe('RamSelectorComponent', () => {
  let component: RamSelectorComponent;
  let fixture: ComponentFixture<RamSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RamSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RamSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
