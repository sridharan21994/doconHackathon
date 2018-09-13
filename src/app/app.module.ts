import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { RadioButtonQuestionsComponent } from './radio-button-questions/radio-button-questions.component';
import { SliderQuestionsComponent } from './slider-questions/slider-questions.component';
import { BubbleComponent } from './bubble/bubble.component';
import { HopiComponent } from './hopi/hopi.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    RadioButtonQuestionsComponent,
    SliderQuestionsComponent,
    BubbleComponent,
    HopiComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
