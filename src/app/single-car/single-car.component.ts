import { Component, OnInit } from '@angular/core';
import { ShowSingleCarService } from '../services/showCars/showSingleCar.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from '../models/car.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from 'ngx-gallery-9';

@Component({
  selector: 'app-single-car',
  templateUrl: './single-car.component.html',
  styleUrls: ['./single-car.component.scss']
})
export class SingleCarComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  id: string = '';
  carSubscription: Subscription;
  photosSubscription: Subscription;
  car: Car = {
    firebaseId: this.id,
    year: 0,//
    brand: '',//
    model: '',//
    bodyType: '',
    price: 0,//
    fuelType: '',
    horsePower: 0,//
    odometer: 0,//
    engine: 0,//
    doorCount: 0,
    isArchived: false,//
    status: '',
    gearbox: ''
  };
  photos: string[];
  homepage = false;
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
      console.log(this.photos[0]);
      for(let i=0; i<this.photos.length; i++) {
        this.galleryImages[i] = {
          small: this.photos[i],
          medium: this.photos[i],
          big: this.photos[i]
        }
      }
    })

    this.galleryOptions = [
      {
          width: '50vw',
          height: '50vw',
          imageSize: NgxGalleryImageSize.Contain,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
    ];


  }

}
