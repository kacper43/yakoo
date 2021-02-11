/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShowSingleCarService } from './showSingleCar.service';

describe('Service: ShowSingleCar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowSingleCarService]
    });
  });

  it('should ...', inject([ShowSingleCarService], (service: ShowSingleCarService) => {
    expect(service).toBeTruthy();
  }));
});
