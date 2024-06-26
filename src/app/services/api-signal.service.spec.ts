import { TestBed } from '@angular/core/testing';

import { ApiSignalService } from './api-signal.service';

describe('ApiSignalService', () => {
  let service: ApiSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
