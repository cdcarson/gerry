import { TestBed, inject } from '@angular/core/testing';

import { VarianceService } from './variance.service';

describe('VarianceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VarianceService]
    });
  });

  it('should ...', inject([VarianceService], (service: VarianceService) => {
    expect(service).toBeTruthy();
  }));
});
