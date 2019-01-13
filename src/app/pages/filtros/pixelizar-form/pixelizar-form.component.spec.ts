import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelizarFormComponent } from './pixelizar-form.component';

describe('PixelizarFormComponent', () => {
  let component: PixelizarFormComponent;
  let fixture: ComponentFixture<PixelizarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixelizarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelizarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
