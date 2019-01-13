import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrilhoFormComponent } from './brilho-form.component';

describe('BrilhoFormComponent', () => {
  let component: BrilhoFormComponent;
  let fixture: ComponentFixture<BrilhoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrilhoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrilhoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
