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

  pageType = 'cars-list';
  filterBadgeText = 'POKAŻ FILTRY';
  filterShown = false;
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

    toggleFilters() {
      this.filterShown = !this.filterShown;

      let filters = document.getElementById('filter-box');
      let filtersButton = document.getElementById('filter-button');
      if(this.filterShown) {
        filters.style.transform = "translateY(8vh)";
        filters.style.background = "rgba(255, 255, 255, 1)";
        filters.style.paddingTop = "2vh";
        filters.style.paddingBottom = "2vh";
        filtersButton.style.transform = "translate(-50%, 10vh)"
        this.filterBadgeText = "UKRYJ FILTRY";
      } else {
        filters.style.transform = "translateY(0)";
        filters.style.background = "rgba(255, 255, 255, 0)";
        filters.style.paddingTop = "0";
        filters.style.paddingBottom = "0";
        filtersButton.style.transform = "translate(-50%, 0)";
        this.filterBadgeText = "POKAŻ FILTRY";
      }
      
    }
}
