import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLeavestatusComponent } from './teacher-leavestatus.component';

describe('TeacherLeavestatusComponent', () => {
  let component: TeacherLeavestatusComponent;
  let fixture: ComponentFixture<TeacherLeavestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherLeavestatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherLeavestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
