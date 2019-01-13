import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DilatarFormComponent } from './dilatar-form.component';

describe('DilatarFormComponent', () => {
  let component: DilatarFormComponent;
  let fixture: ComponentFixture<DilatarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DilatarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DilatarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
