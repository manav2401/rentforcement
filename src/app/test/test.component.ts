import { Component, OnInit, Input } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  startDate = Date.now();
  minDate = new Date();
  maxDate = new Date(2020, 11, 31);
  constructor() { }

  ngOnInit(): void {
  }

  dateInput(event) {
    console.log(event.value)
  }

}
