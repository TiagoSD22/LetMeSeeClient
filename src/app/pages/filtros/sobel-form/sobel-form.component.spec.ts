import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SobelFormComponent } from './sobel-form.component';

describe('SobelFormComponent', () => {
  let component: SobelFormComponent;
  let fixture: ComponentFixture<SobelFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SobelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SobelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
