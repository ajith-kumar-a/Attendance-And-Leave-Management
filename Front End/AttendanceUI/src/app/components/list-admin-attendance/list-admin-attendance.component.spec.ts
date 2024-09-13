import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdminAttendanceComponent } from './list-admin-attendance.component';

describe('ListAdminAttendanceComponent', () => {
  let component: ListAdminAttendanceComponent;
  let fixture: ComponentFixture<ListAdminAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAdminAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAdminAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
