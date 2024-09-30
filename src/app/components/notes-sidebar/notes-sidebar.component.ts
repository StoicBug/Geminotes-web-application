import { Component, OnInit } from '@angular/core';
import { NgForOf, NgClass, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { NotesSharingService } from '../../services/notes-sharing.service';

interface GroupedNote {
  url: string;
  notes: any[];
  selected: boolean;
}

@Component({
  selector: 'app-notes-sidebar',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    FormsModule,
    TruncatePipe,
    NgIf
  ],
  templateUrl: './notes-sidebar.component.html',
  styleUrl: './notes-sidebar.component.css'
})
export class NotesSidebarComponent implements OnInit {
  
  groupedNotes: GroupedNote[] = [];
  notes: any[] = [];
  user$: Observable<any>;
  searchTerm: string = '';
  selectAll: boolean = false; // Add this line

  constructor(private firestore: Firestore, private auth: Auth, private notesSharingService: NotesSharingService) {
    this.user$ = user(this.auth);
  }

  ngOnInit() {
    this.user$.subscribe(user => {
      if (user) {
        this.getNotes(user.email);
      }
    });
  }

  async getNotes(userEmail: string) {
    const notesRef = collection(this.firestore, 'notes');
    const q = query(notesRef, where("userEmail", "==", userEmail));
    const querySnapshot = await getDocs(q);
    const notes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      url: doc.data()['url'],
      ...doc.data()
    }));

    // Group notes by URL
    const groupedByUrl = notes.reduce<Record<string, any[]>>((acc, note) => {
      if (!acc[note.url]) {
        acc[note.url] = [];
      }
      acc[note.url].push(note);
      return acc;
    }, {});

    this.groupedNotes = Object.entries(groupedByUrl).map(([url, notes]) => ({
      url,
      notes: notes as any[],
      selected: false
    }));
  }

  toggleSelection(group: GroupedNote) {
    group.selected = !group.selected;
    this.updateSelectedNotes();
  }

  toggleSelectAll() { // Add this method
    this.groupedNotes.forEach(group => group.selected = this.selectAll);
    this.groupedNotes.forEach(group => group.selected = this.selectAll);
    this.updateSelectedNotes();
  }

  updateSelectedNotes() {
    const selectedNoteIds = this.groupedNotes
      .filter(group => group.selected)
      .flatMap(group => group.notes.map(note => note.id));
    this.notesSharingService.updateSelectedNotes(selectedNoteIds);
  }

  filterNotes(): GroupedNote[] {
    if (!this.searchTerm.trim()) {
      return this.groupedNotes;
    }

    const regex = new RegExp(this.searchTerm, 'i');
    return this.groupedNotes.filter(group => 
      regex.test(group.notes[0].title) || 
      group.notes.some(note => regex.test(note.content))
    );
  }

  // Add a method to check if there are no notes
  get hasNoNotes(): boolean {
    return this.groupedNotes.length === 0;
  }
}