import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqualizarCanalFormComponent } from './equalizar-canal-form.component';

describe('EqualizarCanalFormComponent', () => {
  let component: EqualizarCanalFormComponent;
  let fixture: ComponentFixture<EqualizarCanalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqualizarCanalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqualizarCanalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
