import { TestBed } from '@angular/core/testing';

import { ProfilieService } from './profilie.service';

describe('ProfilieService', () => {
  let service: ProfilieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
