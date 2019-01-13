import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotacaoHorariaFormComponent } from './rotacao-horaria-form.component';

describe('RotacaoHorariaFormComponent', () => {
  let component: RotacaoHorariaFormComponent;
  let fixture: ComponentFixture<RotacaoHorariaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotacaoHorariaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotacaoHorariaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
