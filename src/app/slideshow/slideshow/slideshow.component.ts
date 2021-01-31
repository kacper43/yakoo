import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit {

  constructor() { }

  pageOffset = 0;
  @HostListener('window:scroll', ['$event'])
  scrollHandler() {
    let scrollText = document.querySelector('.scroll-down-text') as HTMLElement;

    if(window.pageYOffset != 0) {
      scrollText.style.animation = 'hide 1s';
    } else {
      scrollText.style.animation = 'pulse 2s infinite';
    }
  }

  ngOnInit() {
  }

}
