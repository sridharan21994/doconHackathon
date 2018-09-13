import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopiComponent } from './hopi.component';

describe('HopiComponent', () => {
  let component: HopiComponent;
  let fixture: ComponentFixture<HopiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
