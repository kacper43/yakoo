import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-main',
  templateUrl: './homepage-main.component.html',
  styleUrls: ['./homepage-main.component.scss']
})
export class HomepageMainComponent implements OnInit {

  constructor() { }

  pageType = 'homepage';
  ngOnInit() {
  }

}
