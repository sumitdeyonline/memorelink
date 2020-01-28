import { TestBed } from '@angular/core/testing';

import { ContentfulrapperService } from './contentfulrapper.service';

describe('ContentfulrapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentfulrapperService = TestBed.get(ContentfulrapperService);
    expect(service).toBeTruthy();
  });
});
