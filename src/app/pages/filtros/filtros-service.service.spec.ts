import { TestBed } from '@angular/core/testing';

import { FiltrosServiceService } from './filtros-service.service';

describe('FiltrosServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FiltrosServiceService = TestBed.get(FiltrosServiceService);
    expect(service).toBeTruthy();
  });
});
