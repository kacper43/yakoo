import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Car } from '../models/car.model';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.scss']
})
export class AllCarsComponent implements OnInit {

  constructor(private carsService: CarsService) { }

  cars: Car[] = [];
  carsSub: Subscription;
  filterType = 'timestamp';
  filterDirection = 'desc';
  showSpinner = true;

    ngOnInit() {
      this.carsSub = this.carsService.getCarsFromServer(this.filterType, this.filterDirection).subscribe((carsArray: Car[]) => {
        this.cars = carsArray;
        this.showSpinner = false;
        //console.log(this.cars);
      })

    }

    filterChanged() {
      this.showSpinner = true;
      console.log(this.filterType);
      this.carsSub.unsubscribe();
      this.carsSub = this.carsService.getCarsFromServer(this.filterType, this.filterDirection).subscribe((carsArray: Car[]) => {
        this.cars = carsArray;
        this.showSpinner = false;
        //console.log(this.cars);
      })
    }
}
