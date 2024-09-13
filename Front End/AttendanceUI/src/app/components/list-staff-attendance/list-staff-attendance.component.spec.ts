import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStaffAttendanceComponent } from './list-staff-attendance.component';

describe('ListStaffAttendanceComponent', () => {
  let component: ListStaffAttendanceComponent;
  let fixture: ComponentFixture<ListStaffAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListStaffAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStaffAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
