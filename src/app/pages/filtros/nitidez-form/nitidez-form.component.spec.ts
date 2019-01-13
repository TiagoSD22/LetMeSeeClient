import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NitidezFormComponent } from './nitidez-form.component';

describe('NitidezFormComponent', () => {
  let component: NitidezFormComponent;
  let fixture: ComponentFixture<NitidezFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NitidezFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NitidezFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
