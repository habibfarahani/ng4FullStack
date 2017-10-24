import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  id: string;
  host:string;

  constructor() { 
    this.id='--:--:--:--:--:--';
    this.host='disconnected';
  }

  ngOnInit() {

  }

}
