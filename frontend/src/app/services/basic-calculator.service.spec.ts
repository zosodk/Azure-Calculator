import { TestBed } from '@angular/core/testing';

import { BasicCalculatorService } from './basic-calculator.service';

describe('BasicCalculatorService', () => {
  let service: BasicCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
