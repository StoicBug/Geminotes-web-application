import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgClass, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NotesSidebarComponent} from "./components/notes-sidebar/notes-sidebar.component";
import {ChatAreaComponent} from "./components/chat-area/chat-area.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, FormsModule, NgForOf, NotesSidebarComponent, ChatAreaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Geminotes';

}
