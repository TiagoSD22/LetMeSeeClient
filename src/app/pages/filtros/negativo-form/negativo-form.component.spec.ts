import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegativoFormComponent } from './negativo-form.component';

describe('NegativoFormComponent', () => {
  let component: NegativoFormComponent;
  let fixture: ComponentFixture<NegativoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegativoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegativoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
