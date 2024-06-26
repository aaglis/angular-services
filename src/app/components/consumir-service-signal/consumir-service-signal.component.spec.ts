import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumirServiceSignalComponent } from './consumir-service-signal.component';

describe('ConsumirServiceSignalComponent', () => {
  let component: ConsumirServiceSignalComponent;
  let fixture: ComponentFixture<ConsumirServiceSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumirServiceSignalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumirServiceSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
