import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  checked = true;
  indeterminate = false;

  constructor() { }

  ngOnInit() {
  }

  onChange(event:any){
    console.log(event);
  }
}
