import { CarCardAdminComponent } from './admin/car-card-admin/car-card-admin.component';
import { ShowAllCarsComponent } from './admin/show-all-cars/show-all-cars.component';
import { SlideshowComponent } from './homepage/slideshow/slideshow.component';
import { TopbarComponent } from './homepage/topbar/topbar.component';
import { AppRoutingModule } from './app-routing.module';
import { NewOffersComponent } from './homepage/new-offers/new-offers.component';
import { AddNewCarComponent } from './admin/addNewCar/addNewCar.component';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { NgxGalleryModule } from 'ngx-gallery-9';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomepageMainComponent } from './homepage/homepage-main/homepage-main.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleCarComponent } from './single-car/single-car.component';
import { CarCardComponent } from './car-card/car-card.component';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { EditCarComponent } from './admin/edit-car/edit-car.component';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SlideshowComponent,
    NewOffersComponent,
    AddNewCarComponent,
    HomepageMainComponent,
      SingleCarComponent,
      CarCardComponent,
      AllCarsComponent,
      SpinnerComponent,
      ShowAllCarsComponent,
      CarCardAdminComponent,
      EditCarComponent,
      LoginComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule
  ],
  providers: [AngularFirestore, AuthService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
