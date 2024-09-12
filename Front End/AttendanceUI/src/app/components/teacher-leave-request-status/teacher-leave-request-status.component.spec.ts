import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLeaveRequestStatusComponent } from './teacher-leave-request-status.component';

describe('TeacherLeaveRequestStatusComponent', () => {
  let component: TeacherLeaveRequestStatusComponent;
  let fixture: ComponentFixture<TeacherLeaveRequestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherLeaveRequestStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherLeaveRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
