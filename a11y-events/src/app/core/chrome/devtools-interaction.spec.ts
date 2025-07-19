import { TestBed } from '@angular/core/testing';

import { DevtoolsInteraction } from './devtools-interaction';

describe('DevtoolsInteraction', () => {
  let service: DevtoolsInteraction;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevtoolsInteraction);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
