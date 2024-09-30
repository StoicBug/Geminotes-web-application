import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesSharingService {
  private selectedNotesSubject = new BehaviorSubject<string[]>([]);
  selectedNotes$ = this.selectedNotesSubject.asObservable();

  updateSelectedNotes(noteIds: string[]) {
    this.selectedNotesSubject.next(noteIds);
  }
}