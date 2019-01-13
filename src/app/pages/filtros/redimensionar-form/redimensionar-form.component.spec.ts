import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedimensionarFormComponent } from './redimensionar-form.component';

describe('RedimensionarFormComponent', () => {
  let component: RedimensionarFormComponent;
  let fixture: ComponentFixture<RedimensionarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedimensionarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedimensionarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
