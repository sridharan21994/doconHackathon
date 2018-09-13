import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.css']
})

export class BubbleComponent implements OnInit {
  @Input('disabled') disabled:boolean = false;
  @Input('selected') selected:boolean = false;
  @Input('add') add:boolean = false;
  @Input('symptomID') symptomID = '';


  @Output() onRemove: any = new EventEmitter < any > ();
  @Output() onAdd: any = new EventEmitter < any > ();

  constructor() { }

  ngOnInit() {
  }

}
