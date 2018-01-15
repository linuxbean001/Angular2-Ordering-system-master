import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsAllComponent } from './notifications-all.component';

describe('NotificationsAllComponent', () => {
  let component: NotificationsAllComponent;
  let fixture: ComponentFixture<NotificationsAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
