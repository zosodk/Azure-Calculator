import { TestBed } from '@angular/core/testing';

import { AdvancedCalculatorService } from './advanced-calculator.service';

describe('AdvancedCalculatorService', () => {
  let service: AdvancedCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvancedCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
