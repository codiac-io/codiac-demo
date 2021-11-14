import { TestBed, inject } from '@angular/core/testing';

import { QuickviewService } from './quickview.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QuickviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuickviewService]
    });
  });

  it('should be created', inject(
    [QuickviewService],
    (service: QuickviewService) => {
      expect(service).toBeTruthy();
    }
  ));
});
