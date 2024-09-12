import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLeaveRequestStatusComponent } from './student-leave-request-status.component';

describe('StudentLeaveRequestStatusComponent', () => {
  let component: StudentLeaveRequestStatusComponent;
  let fixture: ComponentFixture<StudentLeaveRequestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentLeaveRequestStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentLeaveRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
