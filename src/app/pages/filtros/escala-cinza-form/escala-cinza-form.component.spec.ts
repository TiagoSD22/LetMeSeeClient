import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalaCinzaFormComponent } from './escala-cinza-form.component';

describe('EscalaCinzaFormComponent', () => {
  let component: EscalaCinzaFormComponent;
  let fixture: ComponentFixture<EscalaCinzaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalaCinzaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalaCinzaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
