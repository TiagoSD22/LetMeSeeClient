import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimiarFormComponent } from './limiar-form.component';

describe('LimiarFormComponent', () => {
  let component: LimiarFormComponent;
  let fixture: ComponentFixture<LimiarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimiarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimiarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
