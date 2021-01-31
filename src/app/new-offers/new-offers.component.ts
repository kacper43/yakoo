import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.component.html',
  styleUrls: ['./new-offers.component.scss']
})
export class NewOffersComponent implements OnInit {

  constructor() { }


  cars: any = [];

  ngOnInit() {
    this.cars = [
      {
        id: 1523,
        brand: "Renault",
        model: "Megane",
        year: "2010",
        type: "Coupe",
        course: 198735,
        price: 18000,
        imageUrl: '../../assets/renault.jpg'
      },
      {
        id: 5234,
        brand: "Alfa Romeo",
        model: "159",
        year: "2009",
        type: "Sedan",
        course: 210324,
        price: 17500,
        imageUrl: '../../assets/alfa.jpg'
      },
      {
        id: 7567,
        brand: "BMW",
        model: "3",
        year: "2007",
        type: "Sedan",
        course: 230100,
        price: 21999,
        imageUrl: '../../assets/bmw.jpg'
      }
    ]
  }

}
