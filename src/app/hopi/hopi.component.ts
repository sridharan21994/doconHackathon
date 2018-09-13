import { Component, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import * as _ from 'lodash';
import { NzMessageService } from 'ng-zorro-antd';

import { HopisService } from './hopi.service';

/** @deprecated to be removed in the future */
@Component({
  selector: 'app-hopi',
  templateUrl: './hopi.component.html',
  styleUrls: ['./hopi.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: HopiComponent, multi: true },
    HopisService
  ]
})
export class HopiComponent implements OnChanges, OnInit, ControlValueAccessor, OnDestroy {
  @Input() hopiType: 'diagnosis' | 'symptoms' = 'symptoms';

  // ngModel access
  vm: any = {};
  attributes: any = {};
  hopis = [];
  onChange = Function.prototype;
  onTouched = Function.prototype;

  readonly = true;
  disabled = false;
  editMode = false;

  allDurations = [];
  quickDurations = [];
  suggestedDurations = [];
  severities = [];
  descriptions = [];

  form: FormGroup;
  hopi: any;
  get options(): FormArray {
    return this.form.get('options') as FormArray;
  }

  constructor(private fb: FormBuilder, private message: NzMessageService, private hopisService: HopisService) {}

  // OnChanges
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hopiType && this.hopiType !== 'diagnosis' && this.hopiType !== 'symptoms') {
      this.hopiType = 'symptoms';
    }
  }

  // OnInit
  @HostBinding('class.ant-layout')
  ngOnInit(): void {
    this.allDurations = this.hopisService.getAllDurations();
    this.quickDurations = this.hopisService.quickDurations;

    if (this.hopiType === 'symptoms') {
      this.severities = this.hopisService.severities;
    } else {
      this.descriptions = this.hopisService.descriptions;
    }
  }

  // ControlValueAccessor
  writeValue(obj: any): void {
    if (obj) {
      const id = this.hopiType === 'symptoms' ? 'symptomID' : 'diagnosisID';
      this.vm = obj;
      this.attributes = obj.attributes = obj.attributes || this.attributes;
      this.hopis = obj.hopis = obj.hopis || this.hopis;
      this.hopis.forEach(hopi => hopi.value = (hopi.value || '').split(','));
      if (!obj.hopis || (obj.hopis && !obj.hopis.length)) {
        this.hopisService.getHopis(
          { [id]: obj[id] },
          next => (this.hopis = this.vm.hopis = next),
          this.handleError.bind(this)
        );
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Component
  editHopi(hopi: any = { query: '', options: '' }): void {
    if (!hopi.hopiType || !hopi.hopiTypeID) {
      if (this.hopiType === 'symptoms') {
        hopi.hopiType = 'Symptoms';
        hopi.hopiTypeID = this.vm.symptomID;
      } else {
        hopi.hopiType = 'Diagnosis';
        hopi.hopiTypeID = this.vm.diagnosisID;
      }
    }
    this.hopi = hopi;
    this.hopi.type = hopi.type || 'Options';
    this.editMode = true;
    this.form = this.fb.group({
      query: [this.hopi.query, Validators.required],
      options: this.fb.array([])
    });
    _.split(this.hopi.options, ',').forEach(this.addField.bind(this));
  }

  deleteHopi(hopi: any, index: number): void {
    this.hopisService.deleteHopi(hopi, next => this.hopis.splice(index, 1), this.handleError.bind(this));
  }

  saveHopi({ value, valid }): void {
    if (valid) {
      this.hopi.query = value.query;
      this.hopi.options = _.join(value.options);

      this.hopisService.upsertHopi(
        this.hopi,
        next => {
          this.message.success('Saved HOPI');
          if (!this.hopi.hopiID) {
            this.hopis.push(next);
          }
          _.extend(this.hopi, next);
          this.hopi = {};
          this.editMode = false;
        },
        this.handleError.bind(this)
      );
    } else {
      const mark = (ctrl: FormControl) => {
        ctrl.markAsDirty();
        ctrl.updateValueAndValidity();
      };
      _.forOwn(this.form.controls, ctrl => {
        ctrl instanceof FormArray ? _.forOwn(ctrl.controls, mark.bind(this)) : mark(ctrl);
      });
    }
  }

  addField(value: string = null): void {
    this.options.push(new FormControl(value, Validators.required));
  }

  onDurationSearch(suggest: string): void {
    if (suggest) {
      this.suggestedDurations = this.hopisService.getAllDurations(suggest);
    }
  }

  ngOnDestroy(): void {
    this.hopis.forEach(hopi => hopi.value = (hopi.value || []).join(','));
    this.onChange(this.vm);
  }

  private handleError({ error }): void {
    const msg = typeof error === 'string' ? error : Object.values(error.errors || error || {}).join('. ');
    this.message.error(_.truncate(msg, 50));
  }
}
