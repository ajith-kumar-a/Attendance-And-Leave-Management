import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalNotificationComponent } from './global-notification.component';

describe('GlobalNotificationComponent', () => {
  let component: GlobalNotificationComponent;
  let fixture: ComponentFixture<GlobalNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
