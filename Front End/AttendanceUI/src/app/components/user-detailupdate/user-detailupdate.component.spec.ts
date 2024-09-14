import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailupdateComponent } from './user-detailupdate.component';

describe('UserDetailupdateComponent', () => {
  let component: UserDetailupdateComponent;
  let fixture: ComponentFixture<UserDetailupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailupdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
