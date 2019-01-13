import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrocarCanaisFormComponent } from './trocar-canais-form.component';

describe('TrocarCanaisFormComponent', () => {
  let component: TrocarCanaisFormComponent;
  let fixture: ComponentFixture<TrocarCanaisFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrocarCanaisFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrocarCanaisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
