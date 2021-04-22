import { Component, Input, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Input() homepage;
  constructor(private carsService: CarsService) { }

  ngOnInit() {

  }

  scroll(id) {
    let element = document.getElementById(id);
    element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }

  scrollMobile(id) {
    let element = document.getElementById(id);
    element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    this.hideSideMenu();
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
