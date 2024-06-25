import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumirServiceComponent } from './consumir-service.component';

describe('ConsumirServiceComponent', () => {
  let component: ConsumirServiceComponent;
  let fixture: ComponentFixture<ConsumirServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumirServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumirServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
