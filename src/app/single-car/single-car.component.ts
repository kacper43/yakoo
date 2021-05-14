import { Component, OnInit } from '@angular/core';
import { ShowSingleCarService } from '../services/showCars/showSingleCar.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from '../models/car.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from 'ngx-gallery-9';
import { HammerJS } from 'hammerjs';

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
  pageType = 'car';
  showSpinner = true;
  showImagesSpinner = true;

  constructor(private showCarService: ShowSingleCarService,
              private route: ActivatedRoute,
              private database: AngularFirestore) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.carSubscription = this.showCarService.getCar(this.id).subscribe((fetchedCar) => {
      this.car = fetchedCar;
      this.car.description = this.car.description.replace(/(?:\r\n|\r|\n)/g, '<br>');
      console.log(this.car.description);
      this.showSpinner = false;
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
      this.showImagesSpinner = false;
    })

    this.galleryOptions = [
      {
          width: '70vh',
          height: '70vh',
          imageSize: NgxGalleryImageSize.Contain,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          previewCloseOnClick: true,
          previewCloseOnEsc: true,
          previewKeyboardNavigation: true,
          previewAnimation: true,
          imageSwipe: true,
          thumbnailsSwipe: true

      },
      // max-width 800
      {
          breakpoint: 1200,
          width: '100vw',
          height: '100vw',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20,
          imageSwipe: true
      }
      
    ];


  }

}
