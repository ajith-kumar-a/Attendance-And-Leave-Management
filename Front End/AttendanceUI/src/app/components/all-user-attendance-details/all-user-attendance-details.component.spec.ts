import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserAttendanceDetailsComponent } from './all-user-attendance-details.component';

describe('AllUserAttendanceDetailsComponent', () => {
  let component: AllUserAttendanceDetailsComponent;
  let fixture: ComponentFixture<AllUserAttendanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllUserAttendanceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUserAttendanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
