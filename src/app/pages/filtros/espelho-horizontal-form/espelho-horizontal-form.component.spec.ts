import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspelhoHorizontalFormComponent } from './espelho-horizontal-form.component';

describe('EspelhoHorizontalFormComponent', () => {
  let component: EspelhoHorizontalFormComponent;
  let fixture: ComponentFixture<EspelhoHorizontalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspelhoHorizontalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspelhoHorizontalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
