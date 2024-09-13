import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTeacherAttendanceComponent } from './list-teacher-attendance.component';

describe('ListTeacherAttendanceComponent', () => {
  let component: ListTeacherAttendanceComponent;
  let fixture: ComponentFixture<ListTeacherAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTeacherAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTeacherAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
