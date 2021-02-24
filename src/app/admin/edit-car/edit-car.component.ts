import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Car } from 'src/app/models/car.model';
import { ShowSingleCarService } from 'src/app/services/showCars/showSingleCar.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss']
})
export class EditCarComponent implements OnInit {

  id: string = '';
  carSub: Subscription;
  carForm: FormGroup;
  car: Car;
  brands: string[];
  models: string[] = [];
  years: number[] = [2021];
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

  constructor(private route: ActivatedRoute, private carService: ShowSingleCarService, private formBuilder: FormBuilder) {
    this.filteredEquipment = this.equipmentCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allEquipment.slice()));
   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    for(let i = 1; i < 40; i++) {
      this.years[i] = this.years[i-1] - 1;
    }
    this.carSub = this.carService.getCar(this.id).subscribe((carInfo: Car) => {
      this.car = carInfo;
      this.carForm = this.formBuilder.group({
        firebaseId: this.car.firebaseId,
        year: [this.car.year, Validators.required],
        brand: [this.car.brand, Validators.required],
        model: [this.car.model, Validators.required],
        fuelType: this.car.fuelType,
        horsePower: this.car.horsePower,
        odometer: this.car.odometer,
        engine: this.car.engine,
        bodyType: this.car.bodyType,
        doorCount: this.car.doorCount,
        gearbox: this.car.gearbox,
        price: this.car.price,
        description: this.car.description,
        isArchived: this.car.isArchived,
        status: this.car.status
      })
      this.equipment = this.car.equipment;
    });


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

  updateCar() {
    this.car.fuelType = this.carForm.controls.fuelType.value;
    this.car.equipment = this.equipment;
    this.car.gearbox = this.carForm.controls.gearbox.value;
    this.car.horsePower = this.carForm.controls.horsePower.value;
    this.car.model = this.carForm.controls.model.value;
    this.car.odometer = this.carForm.controls.odometer.value;
    this.car.price = this.carForm.controls.price.value;
    this.car.year = this.carForm.controls.year.value;
    this.car.bodyType = this.carForm.controls.bodyType.value;
    this.car.brand = this.carForm.controls.brand.value;
    this.car.description = this.carForm.controls.description.value;
    this.car.doorCount = this.carForm.controls.doorCount.value;
    this.car.engine = this.carForm.controls.engine.value;
    this.car.isArchived = this.carForm.controls.isArchived.value;
    this.car.status = this.carForm.controls.status.value;

    this.carService.updateCar(this.id, this.car);
  }
}
