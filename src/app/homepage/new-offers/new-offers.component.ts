import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore'
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { CarsService } from 'src/app/services/cars.service';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.component.html',
  styleUrls: ['./new-offers.component.scss']
})
export class NewOffersComponent implements OnInit {

  constructor(private storage: AngularFireStorage, private database: AngularFirestore, private carsService: CarsService) { }


cars: Car[] = [];
carsSub: Subscription;
showSpinner = true;

  ngOnInit() {
    this.carsSub = this.carsService.getFiniteCarsFromServer(3).subscribe((carsArray: Car[]) => {
      this.cars = carsArray;
      this.showSpinner = false;
    })
  }
}
