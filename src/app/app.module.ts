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

@NgModule({
  declarations: [	
    AppComponent,
    TopbarComponent,
    SlideshowComponent,
    NewOffersComponent,
    AddNewCarComponent,
    HomepageMainComponent,
      SingleCarComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
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
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
