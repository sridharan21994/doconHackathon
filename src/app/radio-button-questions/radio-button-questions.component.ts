import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio-button-questions',
  templateUrl: './radio-button-questions.component.html',
  styleUrls: ['./radio-button-questions.component.css']
})
export class RadioButtonQuestionsComponent implements OnInit {
  radioValue;
  @Input() data = {
    question: 'Some question'
  };
  @Output() onSelect: any = new EventEmitter<any>();
  inputValue;
  constructor() { }

  ngOnInit() {
  }

}
