import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.component.html',
  styleUrls: ['./new-offers.component.scss']
})
export class NewOffersComponent implements OnInit {

  constructor(private storage: AngularFireStorage, private database: AngularFirestore, private carsService: CarsService) { }


cars: any = [];
  // files: File[] = [];
  // task: AngularFireUploadTask | undefined;
  // snapshot: Observable<any> | undefined;
  // uploadProgress: Observable<number>[] = [];
  // downloadUrl!: Observable<string>;
  // id: String = '';

  ngOnInit() {
    this.cars = [
      {
        id: 1523,
        brand: "Renault",
        model: "Megane",
        year: "2010",
        type: "Coupe",
        course: 198735,
        price: 18000,
        imageUrl: '../../assets/renault.jpg'
      },
      {
        id: 5234,
        brand: "Alfa Romeo",
        model: "159",
        year: "2009",
        type: "Sedan",
        course: 210324,
        price: 17500,
        imageUrl: '../../assets/alfa.jpg'
      },
      {
        id: 7567,
        brand: "BMW",
        model: "3",
        year: "2007",
        type: "Sedan",
        course: 230100,
        price: 21999,
        imageUrl: '../../assets/bmw.jpg'
      }
    ]
    //this.id = this.database.createId();
  }


//index: number = 0;


  // ref!: AngularFireStorageReference;
  // uploadTask!: AngularFireUploadTask;


  // uploadImage(image: File){

  //     const path = `images/${this.id}/${this.index}`;
  //     const fileRef = this.storage.ref(path);

  //     this.storage.upload(path, this.files[this.index]).snapshotChanges().pipe(
  //       finalize( () => {
  //         fileRef.getDownloadURL().subscribe( (url) => {
  //           let docRef = this.database.collection('imagesURLs').doc(this.id.toString());
  //           docRef.get().toPromise().then(docSnapshot => {
  //             if(docSnapshot.exists){
  //               docRef.update({[this.index]: url});
  //               console.log('added new image url');
  //               this.index--;
  //               if(this.index >= 0) {
  //                 this.uploadImagesButton();
  //               }
  //             } else {
  //               docRef.set({[this.index]: url});
  //               console.log('Created imges urls folder, added new image url');
  //               this.index--;
  //               if(this.index >= 0) {
  //                 this.uploadImagesButton();
  //               }
  //             }
  //           })

  //         })
  //       })
  //     ).subscribe();

  // }


}
