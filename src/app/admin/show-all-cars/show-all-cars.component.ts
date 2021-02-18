import { CarsService } from 'src/app/services/cars.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-show-all-cars',
  templateUrl: './show-all-cars.component.html',
  styleUrls: ['./show-all-cars.component.scss']
})
export class ShowAllCarsComponent implements OnInit {

  constructor(private carsService: CarsService) { }
  
  cars: Car[] = [];
  carsSub: Subscription;
  showSpinner = true;

  ngOnInit() {
    this.carsSub = this.carsService.getCarsFromServerAdmin().subscribe((carsArray: Car[]) => {
      this.cars = carsArray;
      this.showSpinner = false;
      console.log(this.cars);
    })
  }

}
