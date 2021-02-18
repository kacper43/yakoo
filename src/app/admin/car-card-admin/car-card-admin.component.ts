import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-card-admin',
  templateUrl: './car-card-admin.component.html',
  styleUrls: ['./car-card-admin.component.scss']
})
export class CarCardAdminComponent implements OnInit {
  @Input() car: Car;
  constructor() { }

  ngOnInit() {
    //console.log(this.car);
  }

}
