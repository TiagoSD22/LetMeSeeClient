import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlurFormComponent } from './blur-form.component';

describe('BlurFormComponent', () => {
  let component: BlurFormComponent;
  let fixture: ComponentFixture<BlurFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlurFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
