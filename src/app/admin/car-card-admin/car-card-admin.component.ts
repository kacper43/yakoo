import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-car-card-admin',
  templateUrl: './car-card-admin.component.html',
  styleUrls: ['./car-card-admin.component.scss']
})
export class CarCardAdminComponent implements OnInit {
  @Input() car: Car;
  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    //console.log(this.car);
  }

  deleteCarDialog() {
    this.dialog.open(DeleteCarDialogComponent, {
      data: {
        car: this.car
      }
    });
  }

  editCar() {
    this.router.navigate(['/edit-car/' + this.car.firebaseId]);
  }
}

@Component({
  selector: 'app-delete-car-dialog',
  templateUrl: '../dialogs/delete-car-dialog/delete-car-dialog.component.html',
})
export class DeleteCarDialogComponent {

  car: Car;
  deleteCar: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private carService: CarsService) {
    this.car = data.car;
  }

  ngOnInit() {
  }

  no() {
    this.deleteCar = false;
    console.log('DONT DELETE');
    this.checkEraseStatus();
  }

  yes() {
    this.deleteCar = true;
    this.checkEraseStatus();
  }

  checkEraseStatus() {
    if(this.deleteCar) {
      this.carService.deleteCar(this.car.firebaseId).subscribe(isResultOk => {
        if(isResultOk) {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
    }
  }
}
