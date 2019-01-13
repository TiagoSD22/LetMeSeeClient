import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqualizarHistogramaFormComponent } from './equalizar-histograma-form.component';

describe('EqualizarHistogramaFormComponent', () => {
  let component: EqualizarHistogramaFormComponent;
  let fixture: ComponentFixture<EqualizarHistogramaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqualizarHistogramaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqualizarHistogramaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
