import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Car } from '../models/car.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private database: AngularFirestore,
              private storage: AngularFireStorage,
              private toastr: ToastrService,
              private router: Router) { }

  files: File[] = [];
  task: AngularFireUploadTask | undefined;
  databaseID: string = '';
  lastImageIndex: number = 0;
  mainImageIndex: number = 0;
  imagesOrder = [];
  models: string[] = ['Wybierz markę samochodu'];
  private modelsUpdated = new Subject<string[]>();
  private newCar: Car = {
    firebaseId: '',
    year: 0,
    brand: '',
    model: '',
    fuelType: '',
    horsePower: 0,
    odometer: 0,
    engine: 0,
    bodyType: '',
    doorCount: 0,
    gearbox: '',
    price: 0,
    isArchived: false,
    status: 'active',
    equipment: [''],
    description: '',
    mainImgUrl: ''
  };

  setMainImageIndex(imageIndex: number) {
    this.mainImageIndex = imageIndex;
    console.log(this.mainImageIndex);
    this.toastr.info("Zdjęcie nr " + (this.mainImageIndex + 1), "Zatwierdzono nowe zdjęcie główne");
  }

  setLastImageIndex(index: number){
    this.lastImageIndex = index;
  }

  setFilesArray(files: File[]){
    this.files = files;
    this.setLastImageIndex(this.files.length - 1);
    this.toastr.info("Załadowano " + this.files.length + " zdjęć", "Nowe pliki");
  }

  setFilesOrder(order: number[]) {
    this.imagesOrder = order;
  }

  generateID(){
    this.databaseID = this.database.createId();
    this.newCar.firebaseId = this.databaseID;
  }

  startImagesUpload(){
    this.uploadSingleImage(this.files[this.lastImageIndex]);
  }

  uploadSingleImage(image: File){
    const path = `images/${this.databaseID}/${this.lastImageIndex}`;
        const fileRef = this.storage.ref(path);

        this.storage.upload(path, this.files[this.imagesOrder[this.lastImageIndex]]).snapshotChanges().pipe(
          finalize( () => {
            fileRef.getDownloadURL().subscribe( (url) => {
              let docRef = this.database.collection('imagesURLs').doc(this.databaseID.toString());
              docRef.get().toPromise().then(docSnapshot => {
                if(docSnapshot.exists){
                  docRef.update({[this.lastImageIndex]: url});
                  console.log("index zdjecia: " + this.lastImageIndex)
                  if(this.lastImageIndex === this.mainImageIndex) {
                    this.newCar.mainImgUrl = url;
                    console.log(url);
                  }
                  console.log('added new image url');
                  this.toastr.success("Pozostałe zdjęcia: " + this.lastImageIndex, "Zdjęcie wysłane");
                  this.lastImageIndex--;
                  if(this.lastImageIndex >= 0) {
                    this.startImagesUpload();
                  } else {
                    this.addNewCar();
                  }
                } else {
                  docRef.set({[this.lastImageIndex]: url});
                  console.log('Created imges urls folder, added new image url');
                  this.toastr.success("Utworzono nową kolekcję", "na serwerze");
                  this.toastr.success("Pozostałe zdjęcia: " + this.lastImageIndex, "Zdjęcie wysłane");
                  if(this.lastImageIndex === this.mainImageIndex) {
                    this.newCar.mainImgUrl = url;
                    console.log(url);
                  }
                  this.lastImageIndex--;
                  if(this.lastImageIndex >= 0) {
                    this.startImagesUpload();
                  } else {
                    this.addNewCar();
                  }
                }
              })

            })
          })
        ).subscribe();

  }

  addNewCar() {
    this.toastr.success("Przesyłanie zdjęć zakończone!");
    this.newCar.timestamp = new Date();
    this.database.collection('cars').doc(this.databaseID).set(this.newCar);
    this.toastr.info('Dodano nowy samochód');
    this.toastr.info('do nowego ogłoszenia', 'Za 5 sekund zostaniesz przeniesiony');

    setTimeout( () => {
      this.router.navigate(['/car/' + this.databaseID]);
    }, 5000);


  }

  setNewCar(car: Car): Observable<boolean> {
    this.newCar.fuelType = car.fuelType;
    this.newCar.equipment = car.equipment;
    this.newCar.gearbox = car.gearbox;
    this.newCar.horsePower = car.horsePower;
    this.newCar.isArchived = false;
    this.newCar.model = car.model;
    this.newCar.odometer = car.odometer;
    this.newCar.price = car.price;
    this.newCar.status = 'active';
    this.newCar.year = car.year;
    this.newCar.bodyType = car.bodyType;
    this.newCar.brand = car.brand;
    this.newCar.description = car.description;
    this.newCar.doorCount = car.doorCount;
    this.newCar.engine = car.engine;

    return of(true);
  }

  getCarBrands() {
    const fetchedBrands = [];
    this.database.collection('brands').get().toPromise().then((querySnapshot) => {

      querySnapshot.forEach((doc) => {
        fetchedBrands.push(doc.id);
      });
    });
    console.log(fetchedBrands);
    return fetchedBrands;
  }

  getCarModels(carBrand: string) {

    this.database.collection('brands').doc(carBrand).get().toPromise().then((doc) => {
      const json = doc.data();
      this.models = json['models'];
      console.log(this.models);
      this.modelsUpdated.next(this.models);

    });

  }

  getCarModelsDefault() {
    this.models = [];
    this.modelsUpdated.next(this.models);
  }

  getModelsListener(){
    return this.modelsUpdated.asObservable();
  }

  getCarsFromServer(orderType: string, orderDirection: string): Observable<Car[]>{
    let data = [];
    let allCars = new Subject<Car[]>();
    let allCarsObs = allCars.asObservable();
    switch(orderDirection) {
      case 'desc':
        this.database.collection('cars', ref => ref.where('isArchived', '==', false).orderBy(orderType, 'desc')).get().toPromise().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
            allCars.next(data);
            console.log(data);

          })
        })
        return allCarsObs;
        break;
      case 'asc':
        this.database.collection('cars', ref => ref.where('isArchived', '==', false).orderBy(orderType, 'asc')).get().toPromise().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
            allCars.next(data);
            console.log(data);

          })
        })
        return allCarsObs;
        break;
      default:
        console.error("Nie można zastosować filtru");
        return allCarsObs;
    }

  }

  getCarsFromServerAdmin(): Observable<Car[]> {
    let data = [];
    let allCars = new Subject<Car[]>();
    let allCarsObs = allCars.asObservable();

    this.database.collection('cars', ref => ref.orderBy('timestamp', 'desc')).get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
        allCars.next(data);

      })
    })
    return allCarsObs;

  }


  getFiniteCarsFromServer(count: number): Observable<Car[]>{
    let cars = new Subject<Car[]>();
    let carsObs = cars.asObservable();
    let data = [];
    this.database.collection('cars', ref => ref.where('isArchived', '==', false).orderBy('timestamp', 'desc').limit(count)).get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
        cars.next(data);
      })
    })

    return carsObs;

  }

}
