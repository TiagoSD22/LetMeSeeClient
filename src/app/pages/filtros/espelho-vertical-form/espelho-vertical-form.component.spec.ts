import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspelhoVerticalFormComponent } from './espelho-vertical-form.component';

describe('EspelhoVerticalFormComponent', () => {
  let component: EspelhoVerticalFormComponent;
  let fixture: ComponentFixture<EspelhoVerticalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspelhoVerticalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspelhoVerticalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
