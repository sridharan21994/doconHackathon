import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider-questions',
  templateUrl: './slider-questions.component.html',
  styleUrls: ['./slider-questions.component.css']
})
export class SliderQuestionsComponent implements OnInit {
  @Input() data = {
    question: 'Some question'
  };
  marks: any = {
    0  : '0',
    25 : {
      style: {
        color: '#6cbd7d',
      },
      label: '<strong>25</strong>',
    },
    50 : {
      style: {
        color: '#6cbd7d',
      },
      label: '<strong>50</strong>',
    },
    100: '100 days'
  };
  constructor() { }

  ngOnInit() {
  }

}
