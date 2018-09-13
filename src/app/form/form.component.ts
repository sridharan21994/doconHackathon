import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  selectedValue = '';
  isVisible = false;
  selectedSymptom = '';
  symptomID = '';
  dropdownValue = '';
  severity = '';
  durationOptions = [
    '1 day',
    '2 days',
    '3 days',
    '4 days',
    '5 days',
    '6 days',
    '1 week',
    '10 days',
    '2 weeks',
    '15 days',
    '20 days',
    '1 month'
  ];
  data = {};
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  symptoms = [{"symptomID":"F62803","name":"Cold stimulus headache","isFinding":false,"snomedCT_code":"103009000","tags":[],"owner":"master"},{"symptomID":"F114199","name":"Lumbar spine cold","isFinding":false,"snomedCT_code":"298682008","tags":[],"owner":"master"},{"symptomID":"F22491","name":"Complaining of cold hands","isFinding":false,"snomedCT_code":"161997005","tags":[],"owner":"master"},{"symptomID":"F77209","name":"Accident due to excessive cold","isFinding":false,"snomedCT_code":"217602000","tags":[],"owner":"master"},{"symptomID":"F20712","name":"On examination - cold and clammy","isFinding":false,"snomedCT_code":"162691005","tags":[],"owner":"master"},{"symptomID":"F22692","name":"On examination - cold extremities (context-dependent category)","isFinding":false,"snomedCT_code":"164447002","tags":[],"owner":"master"},{"symptomID":"F20713","name":"On examination - cold and clammy (context-dependent category)","isFinding":false,"snomedCT_code":"162691005","tags":[],"owner":"master"},{"symptomID":"F82774","name":"[X]Exposure to excessive cold of man-made origin, occurrence at home","isFinding":false,"snomedCT_code":"221267005","tags":[],"owner":"master"}];
  constructor(private http: HttpClient) {

  //   this.http.get('10.0.0.42:8000/new/1008').subscribe((data: Config) => this.config = {
  //     heroesUrl: data['heroesUrl'],
  //     textfile:  data['textfile']
  // });

}

  ngOnInit() {
  }

  onSelect(ev ) {
      this.selectedValue = ev;
  }

  bubbleClick (ev) {
    console.log('bub', ev);
    this.selectedSymptom = ev.target.innerText;
    this.symptomID = ev.target.getAttribute('data-symptomID');
    if (this.data[this.symptomID]) {
      this.severity = this.data[this.symptomID].severity;
      this.dropdownValue = this.data[this.symptomID].duration;
    } else {
      this.severity = '';
      this.dropdownValue = '';
    }
    this.isVisible = true;
    console.log('sgdfdf', ev.target.getAttribute('data-symptomID'), ev.target);
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.data[this.symptomID] = {
      duration: this.dropdownValue,
      severity: this.severity
    };
    console.log('----', this.data);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  RemoveFromList() {
    delete this.data[this.symptomID];
    this.isVisible = false;
  }
  submit() {
    let response = {};
       this.symptoms.forEach(item=>{
          if(this.data[item.symptomID]) {
             response[item.symptomID] = {
               symptom : item,
               duration : this.data[item.symptomID].duration,
               severity : this.data[item.symptomID].severity
             }
          }
       });
       this.selectedValue = 'submit';
       this.http.post('http://10.0.0.42:8000/save/', response, this.httpOptions).subscribe((res) => {
         console.log('-ssd-f-sd', res);
       });
       console.log('response-----', JSON.stringify(response));
  }
}
