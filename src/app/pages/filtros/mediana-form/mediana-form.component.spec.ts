import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedianaFormComponent } from './mediana-form.component';

describe('MedianaFormComponent', () => {
  let component: MedianaFormComponent;
  let fixture: ComponentFixture<MedianaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedianaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedianaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
