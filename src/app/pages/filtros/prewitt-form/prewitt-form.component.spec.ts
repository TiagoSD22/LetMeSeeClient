import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrewittFormComponent } from './prewitt-form.component';

describe('PrewittFormComponent', () => {
  let component: PrewittFormComponent;
  let fixture: ComponentFixture<PrewittFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrewittFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrewittFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
