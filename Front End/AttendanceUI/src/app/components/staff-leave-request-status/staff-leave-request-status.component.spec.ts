import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLeaveRequestStatusComponent } from './staff-leave-request-status.component';

describe('StaffLeaveRequestStatusComponent', () => {
  let component: StaffLeaveRequestStatusComponent;
  let fixture: ComponentFixture<StaffLeaveRequestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffLeaveRequestStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffLeaveRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
