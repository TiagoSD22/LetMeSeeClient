import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrasteFormComponent } from './contraste-form.component';

describe('ContrasteFormComponent', () => {
  let component: ContrasteFormComponent;
  let fixture: ComponentFixture<ContrasteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContrasteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrasteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
