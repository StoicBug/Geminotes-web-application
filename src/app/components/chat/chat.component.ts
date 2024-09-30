import { Component } from '@angular/core';
import {ChatAreaComponent} from "../chat-area/chat-area.component";
import {NotesSidebarComponent} from "../notes-sidebar/notes-sidebar.component";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    ChatAreaComponent,
    NotesSidebarComponent,
    HeaderComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  toggleDrawer() {
  const drawer = document.getElementById('my-drawer') as HTMLInputElement;
  if (drawer) {
    drawer.checked = !drawer.checked;
  }
}
}
