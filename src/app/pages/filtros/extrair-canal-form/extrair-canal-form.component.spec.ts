import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrairCanalFormComponent } from './extrair-canal-form.component';

describe('ExtrairCanalFormComponent', () => {
  let component: ExtrairCanalFormComponent;
  let fixture: ComponentFixture<ExtrairCanalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtrairCanalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtrairCanalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
