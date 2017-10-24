import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  direction = 'row';
  welcome1Image = 'assets/images/download1-200x400.jpg';
  welcome2Image = 'assets/images/download2-200x400.jpg';
  intro = 'assets/images/intro.jpg';
  
  constructor() { }

  ngOnInit() {
  }
  
  toggleDirection() {
    this.direction = (this.direction === 'column') ? 'row' : 'column';
  }

}
