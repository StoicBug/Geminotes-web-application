import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { Functions, httpsCallable } from '@angular/fire/functions';
import { NotesSharingService } from '../../services/notes-sharing.service';
import { Subscription } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-chat-area',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './chat-area.component.html',
  styleUrl: './chat-area.component.css'
})
export class ChatAreaComponent implements OnInit, OnDestroy {

  private functions: Functions = inject(Functions);
  private notesSharingService: NotesSharingService = inject(NotesSharingService);
  private subscription!: Subscription;

  messages = [
    { content: 'Hello!', isUser: false },
    // Add more messages as needed
  ];

  newMessage = '';
  relevantNoteIds: string[] = [];
  loading: boolean = false; // Add loading state

  ngOnInit() {
    this.subscription = this.notesSharingService.selectedNotes$.subscribe(
      noteIds => {
        this.relevantNoteIds = noteIds;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async sendMessage() {
    if (this.newMessage.trim() === '') return;

    this.messages.push({ content: this.newMessage, isUser: true });
    this.loading = true; // Set loading to true

    const chatWithNotes = httpsCallable(this.functions, 'chatWithNotes');

    try {
      const result = await chatWithNotes({ 
        query: this.newMessage, 
        noteIds: this.relevantNoteIds 
      });
      
      const response = (result.data as { response?: string })?.response || 'Sorry, I did not understand that.';

      this.messages.push({ content: response as string, isUser: false });
    } catch (error) {
      console.error('Error calling function:', error);
      this.messages.push({ content: 'Sorry, an error occurred. Make sure to select the notes you want to use for the conversation.', isUser: false });
    } finally {
      this.loading = false; // Reset loading state
    }

    this.newMessage = '';
  }
}