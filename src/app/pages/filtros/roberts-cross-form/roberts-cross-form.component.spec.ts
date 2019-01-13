import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobertsCrossFormComponent } from './roberts-cross-form.component';

describe('RobertsCrossFormComponent', () => {
  let component: RobertsCrossFormComponent;
  let fixture: ComponentFixture<RobertsCrossFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobertsCrossFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobertsCrossFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
