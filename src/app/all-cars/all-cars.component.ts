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


    ngOnInit() {
      this.carsSub = this.carsService.getCarsFromServer().subscribe((carsArray: Car[]) => {
        this.cars = carsArray;
        console.log(this.cars);
      })

    }
}
