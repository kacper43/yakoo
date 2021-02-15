import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore'
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { CarsService } from 'src/app/services/cars.service';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.component.html',
  styleUrls: ['./new-offers.component.scss']
})
export class NewOffersComponent implements OnInit {

  constructor(private storage: AngularFireStorage, private database: AngularFirestore, private carsService: CarsService) { }


cars: Car[] = [];
carsSub: Subscription;
  // files: File[] = [];
  // task: AngularFireUploadTask | undefined;
  // snapshot: Observable<any> | undefined;
  // uploadProgress: Observable<number>[] = [];
  // downloadUrl!: Observable<string>;
  // id: String = '';

  ngOnInit() {
    this.carsSub = this.carsService.getFiniteCarsFromServer(3).subscribe((carsArray: Car[]) => {
      this.cars = carsArray;
    })
    
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
