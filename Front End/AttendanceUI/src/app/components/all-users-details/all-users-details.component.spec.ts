import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUsersDetailsComponent } from './all-users-details.component';

describe('AllUsersDetailsComponent', () => {
  let component: AllUsersDetailsComponent;
  let fixture: ComponentFixture<AllUsersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllUsersDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUsersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
