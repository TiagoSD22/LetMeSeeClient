import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CortarFormComponent } from './cortar-form.component';

describe('CortarFormComponent', () => {
  let component: CortarFormComponent;
  let fixture: ComponentFixture<CortarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CortarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CortarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
