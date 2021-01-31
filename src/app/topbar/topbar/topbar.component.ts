import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showSideMenu() {
    let sideMenu = document.querySelector('.side-menu') as HTMLElement;
    sideMenu.style.opacity = '1';
    sideMenu.style.transform = 'translateX(0%)';
  }

  hideSideMenu() {
    let sideMenu = document.querySelector('.side-menu') as HTMLElement;
    sideMenu.style.opacity = '0';
    sideMenu.style.transform = 'translateX(100%)';
  }
}
