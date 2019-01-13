import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotacaoAntiHorariaFormComponent } from './rotacao-anti-horaria-form.component';

describe('RotacaoAntiHorariaFormComponent', () => {
  let component: RotacaoAntiHorariaFormComponent;
  let fixture: ComponentFixture<RotacaoAntiHorariaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotacaoAntiHorariaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotacaoAntiHorariaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
