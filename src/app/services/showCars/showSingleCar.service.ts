import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Car } from 'src/app/models/car.model';

@Injectable({
  providedIn: 'root'
})
export class ShowSingleCarService {

constructor(private database: AngularFirestore) { }

getCar(id: string): Observable<Car> {
  let car = new Subject<Car>();
  let carObs = car.asObservable();

  this.database.collection('cars').doc(id).get().toPromise().then((doc) => {
    if(doc.exists) {
      car.next(doc.data() as Car);
    }
  })

  return carObs;
}

getCarPhotos(id: string): Observable<string[]>{
  let photos = [];
  let photosObj;
  let photosCount = 0;

  let photosSub = new Subject<string[]>();
  let photosObs = photosSub.asObservable();

  this.database.collection('imagesURLs').doc(id).get().toPromise().then((doc) => {
    if(doc.exists) {
      //console.log(doc.data());
      photosObj = doc.data();
      photosCount = Object.keys(photosObj).length;
      for(let i = 0; i < photosCount; i++) {
        photos.push(photosObj[i])
      }
      photosSub.next(photos);

    }
  });
  return photosObs;
}

}


