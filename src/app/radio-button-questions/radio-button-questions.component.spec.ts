import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonQuestionsComponent } from './radio-button-questions.component';

describe('RadioButtonQuestionsComponent', () => {
  let component: RadioButtonQuestionsComponent;
  let fixture: ComponentFixture<RadioButtonQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioButtonQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
