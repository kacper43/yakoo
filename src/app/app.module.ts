import { SlideshowComponent } from './slideshow/slideshow/slideshow.component';
import { TopbarComponent } from './topbar/topbar/topbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewOffersComponent } from './new-offers/new-offers.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SlideshowComponent,
    NewOffersComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
