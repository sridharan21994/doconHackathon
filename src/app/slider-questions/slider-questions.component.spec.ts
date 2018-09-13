import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderQuestionsComponent } from './slider-questions.component';

describe('SliderQuestionsComponent', () => {
  let component: SliderQuestionsComponent;
  let fixture: ComponentFixture<SliderQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
