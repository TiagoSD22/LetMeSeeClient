import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjusteRgbFormComponent } from './ajuste-rgb-form.component';

describe('AjusteRgbFormComponent', () => {
  let component: AjusteRgbFormComponent;
  let fixture: ComponentFixture<AjusteRgbFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjusteRgbFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjusteRgbFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
