import { TestBed } from '@angular/core/testing';

import { NotesSharingService } from './notes-sharing.service';

describe('NotesSharingService', () => {
  let service: NotesSharingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesSharingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
