import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewCarComponent } from './admin/addNewCar/addNewCar.component';
import { ShowAllCarsComponent } from './admin/show-all-cars/show-all-cars.component';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { HomepageMainComponent } from './homepage/homepage-main/homepage-main.component';
import { SingleCarComponent } from './single-car/single-car.component';

const routes: Routes = [
  { path: '', component: HomepageMainComponent},
  { path: 'admin/add-new-car', component: AddNewCarComponent},
  { path: 'car/:id', component: SingleCarComponent},
  { path: 'cars', component: AllCarsComponent},
  { path: 'admin/cars', component: ShowAllCarsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
