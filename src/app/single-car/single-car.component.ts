import { Component, OnInit } from '@angular/core';
import { ShowSingleCarService } from '../services/showCars/showSingleCar.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from '../models/car.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-single-car',
  templateUrl: './single-car.component.html',
  styleUrls: ['./single-car.component.scss']
})
export class SingleCarComponent implements OnInit {

  id: string = '';
  carSubscription: Subscription;
  photosSubscription: Subscription;
  car: Car;
  photos: string[];

  constructor(private showCarService: ShowSingleCarService,
              private route: ActivatedRoute,
              private database: AngularFirestore) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.carSubscription = this.showCarService.getCar(this.id).subscribe((fetchedCar) => {
      this.car = fetchedCar;
    });
    this.photosSubscription = this.showCarService.getCarPhotos(this.id).subscribe((photosUrls) => {
      this.photos = photosUrls;
    })
  }

}
