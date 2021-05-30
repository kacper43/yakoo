import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Car } from 'src/app/models/car.model';
import { CarsService } from 'src/app/services/cars.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {CdkDragDrop, CdkDragEnter, CdkDropList, CdkDropListGroup, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-addNewCar',
  templateUrl: './addNewCar.component.html',
  styleUrls: ['./addNewCar.component.scss']
})
export class AddNewCarComponent implements OnInit {

  carForm: FormGroup;
  brands: string[];
  models: string[] = [];
  years: number[] = [2021];
  filteredBrands: Observable<string[]>;
  filteredModels: Observable<string[]>;
  carToSend: Car = {
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
  chosenBrand: string;
  modelsUpdated: Subscription;
  fuelTypes: string[] = ['Benzyna', 'Diesel', 'Benzyna + CNG', 'Benzyna + LPG', 'Elektryczny', 'Etanol', 'Hybryda', 'Wodór'];
  bodyTypes: string[] = ['Hatchback', 'Sedan', 'Kombi', 'Minivan', 'SUV', 'Kabriolet', 'Coupe'];
  gearboxTypes: string[] = ['Manualna', 'Automat', 'Półautomat', 'Automat bezstopniowy'];

  // chips
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  equipmentCtrl = new FormControl();
  filteredEquipment: Observable<string[]>;
  equipment: string[] = [];
  allEquipment: string[] = ['ABS', 'CD', 'Centralny zamek', 'Elektryczne szyby przednie', 'Elektrycznie ustawiane lusterka',
    'Immobilizer', 'Poduszka powietrzna kierowcy', 'Poduszka powietrzna pasażera', 'Radio fabryczne', 'Wspomaganie kierownicy',
    'Alarm', 'Alufelgi', 'ASR (kontrola trakcji)', 'Asystent parkowania', 'Asystent pasa ruchu', 'Bluetooth', 'Czujnik deszczu',
    'Czujnik martwego pola', 'Czujnik zmierzchu', 'Czujniki parkowania', 'Dach panoramiczny', 'Elektrochromatyczne lusterka boczne',
    'Elektryczne szyby tylne', 'Elektrycznie ustawiane fotele', 'ESP (stabilizacja toru jazdy)', 'Gniazdo AUX', 'Gniazdo SD',
    'Hak', 'HUD', 'Isofix', 'Kamera cofania', 'Klimatyzacja automatyczna', 'Klimatyzacja czterostrefowa', 'Klimatyzacja dwustrefowa',
    'Klimatyzacja manualna', 'Komputer pokładowy', 'Kurtyny powietrzne', 'Łopatki zmiany biegów', 'MP3', 'Nawigacja GPS',
    'Odtwarzacz DVD', 'Ogranicznik prędkości', 'Ogrzewanie postojowe', 'Podgrzewana przednia szyba', 'Podgrzewane lusterka boczne',
    'Podgrzewane przednie siedzenia', 'Podgrzewane tylne siedzenia', 'Poduszka powietrzna chroniąca kolana', 'Poduszki boczne przednie',
    'Poduszki boczne tylne', 'Przyciemniane szyby', 'Radio niefabryczne', 'Regulowane zawieszenie', 'Relingi dachowe',
    'System Start-Stop', 'Szyberdach', 'Światła do jazdy dziennej', 'Światła LED', 'Światła przeciwmgielne', 'Światła Xenonowe',
    'Tapicerka skórzana', 'Tapicerka welurowa', 'Tempomat', 'Tempomat aktywny', 'Tuner TV', 'Wielofunkcyjna kierownica',
    'Zmieniarka CD'];

  @ViewChild('equipmentInput') equipmentInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoEq') matAutocomplete: MatAutocomplete;
  // chips end

  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList) placeholder: CdkDropList;
  public target: CdkDropList;
  public targetIndex: number;
  public source: any;
  public sourceIndex: number;

  constructor(private carsService: CarsService, private toastr: ToastrService, private formBuilder: FormBuilder) {
    this.filteredEquipment = this.equipmentCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allEquipment.slice()));
    this.target = null;
    this.source = null;
  }

  ngOnInit() {
    this.carsService.generateID();
    for(let i = 1; i < 40; i++) {
      this.years[i] = this.years[i-1] - 1;
    }
    this.allEquipment.sort();
    //console.log(this.years);
    this.brands = this.carsService.getCarBrands();
    this.carForm = this.formBuilder.group({
      firebaseId: 'firebaseID',
      year: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      fuelType: '',
      horsePower: '',
      odometer: '',
      engine: '',
      bodyType: '',
      doorCount: 0,
      gearbox: '',
      price: 0,
      description: ''
    })
    this.carsService.getCarModelsDefault();
    this.modelsUpdated = this.carsService.getModelsListener().subscribe((fetchedModels: Array<string>) => {
      this.models = fetchedModels;
      console.log("fetched models");
    })

    // this.carForm.valueChanges.subscribe(val => {
    //   console.log(this.carForm);
    // })

    this.filteredBrands = this.carForm.controls.brand.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filterBrand(value))
    );


    this.filteredModels = this.carForm.controls.model.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filterModel(value))
     );

  }

  //chips functions
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.equipment.push(value.trim());
      console.log(this.equipment);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.equipmentCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.equipment.indexOf(fruit);

    if (index >= 0) {
      this.equipment.splice(index, 1);
    }
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    this.equipment.push(event.option.viewValue);
    this.equipmentInput.nativeElement.value = '';
    this.equipmentCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allEquipment.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
// chips functions end

  checkBrand(brand: string) {
    for(let i = 0; i < this.brands.length; i++){
      if(brand === this.brands[i]) {
        this.chosenBrand = brand;
        this.fetchModels();
      }
    }
  }

  fetchModels(){
    this.carsService.getCarModels(this.chosenBrand);
    this._filterModel('');

    // console.log(this.models);
    // subject i subscriber do modeli, nie wczytuje ich dynamicznie
  }

  private _filterBrand(value: string): string[]{
    this.checkBrand(value);
    const filterValue = value.toLowerCase();
    return this.brands.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterModel(value: string): string[]{
    const filterValue = value.toLowerCase();
    console.log("Przefiltrowano");
    return this.models.filter(option => option.toLowerCase().includes(filterValue));
  }


  urls: string[] = [];
  imagesCount: number = 0;
  filesHolder: File[] = [];
  items=[0,1,2,3,4,5,6,7,8,9,10,11];

  drop(event: CdkDragDrop<any>) {
    let buffer;
    buffer = this.imagesOrder[event.previousContainer.data.index];
    this.imagesOrder[event.previousContainer.data.index] = this.imagesOrder[event.container.data.index];
    this.imagesOrder[event.container.data.index] = buffer;
    console.log(this.imagesOrder);
    this.carsService.setFilesOrder(this.imagesOrder);
    this.urls[event.previousContainer.data.index]=event.container.data.item;
    this.urls[event.container.data.index]=event.previousContainer.data.item;


  }

  imagesOrder = [];

  upload($event: any){
    //this.carsService.setFilesArray($event.target.files);
    this.filesHolder = $event.target.files;
    this.carsService.setFilesArray(this.filesHolder);
    for (let i = 0; i < this.filesHolder.length; i++) {
      this.imagesOrder[i] = i;
    }
    console.log(this.imagesOrder);
    this.carsService.setFilesOrder(this.imagesOrder);
    console.log(this.filesHolder);
    console.log(this.urls);
    if(this.filesHolder) {
      this.imagesCount = this.filesHolder.length;
      for(let i = 0; i < this.imagesCount; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(this.filesHolder[i]);
        reader.onload = ( event:any ) => {
        this.urls[i] = event.target.result;
        }
      }
    console.log(this.urls);

    }
  }

  setMainImage(imageIndex: number) {
    let images = Array.from(document.querySelectorAll('.image-preview'));
    images.forEach((image) => {
      image.classList.remove('main-image');
    })
    document.getElementById('image-'+imageIndex).classList.add('main-image');
    this.carsService.setMainImageIndex(imageIndex);
  }

  setNewCar() {
    this.carToSend.fuelType = this.carForm.controls.fuelType.value;
    this.carToSend.equipment = this.equipment;
    this.carToSend.gearbox = this.carForm.controls.gearbox.value;
    this.carToSend.horsePower = this.carForm.controls.horsePower.value;
    this.carToSend.model = this.carForm.controls.model.value;
    this.carToSend.odometer = this.carForm.controls.odometer.value;
    this.carToSend.price = this.carForm.controls.price.value;
    this.carToSend.year = this.carForm.controls.year.value;
    this.carToSend.bodyType = this.carForm.controls.bodyType.value;
    this.carToSend.brand = this.carForm.controls.brand.value;
    this.carToSend.description = this.carForm.controls.description.value;
    this.carToSend.doorCount = this.carForm.controls.doorCount.value;
    this.carToSend.engine = this.carForm.controls.engine.value;
    console.log(this.carToSend);
    this.carsService.setNewCar(this.carToSend).subscribe(isCarSet => {
      isCarSet ? this.uploadImagesButton() : console.log("Car not added, sth went wrong :(");
    })
  }

  uploadImagesButton(){
    this.toastr.info("Rozpoczynam wysyłanie plików...", "Przesyłanie plików")
    this.carsService.startImagesUpload();
  }

  logModels(){
    console.log(this.models);
    console.log(this.filteredModels)
  }

  showUploadPopup() {
    document.getElementById('file-button').click();
  }
}
