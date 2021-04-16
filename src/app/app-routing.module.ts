import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewCarComponent } from './admin/addNewCar/addNewCar.component';
import { EditCarComponent } from './admin/edit-car/edit-car.component';
import { ShowAllCarsComponent } from './admin/show-all-cars/show-all-cars.component';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { HomepageMainComponent } from './homepage/homepage-main/homepage-main.component';
import { SingleCarComponent } from './single-car/single-car.component';

const routes: Routes = [
  { path: '', component: HomepageMainComponent},
  { path: 'login', component: LoginComponent},
  { path: 'admin/add-new-car', component: AddNewCarComponent, canActivate: [AuthGuard]},
  { path: 'car/:id', component: SingleCarComponent},
  { path: 'cars', component: AllCarsComponent},
  { path: 'edit-car/:id', component: EditCarComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: ShowAllCarsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
