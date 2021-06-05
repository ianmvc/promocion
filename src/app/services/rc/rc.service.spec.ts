import { TestBed } from '@angular/core/testing';

import { RcService } from './rc.service';

describe('RcService', () => {
  let service: RcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
