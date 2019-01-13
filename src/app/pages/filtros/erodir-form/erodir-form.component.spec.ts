import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErodirFormComponent } from './erodir-form.component';

describe('ErodirFormComponent', () => {
  let component: ErodirFormComponent;
  let fixture: ComponentFixture<ErodirFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErodirFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErodirFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
