import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentAttendanceComponent } from './list-student-attendance.component';

describe('ListStudentAttendanceComponent', () => {
  let component: ListStudentAttendanceComponent;
  let fixture: ComponentFixture<ListStudentAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListStudentAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStudentAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
