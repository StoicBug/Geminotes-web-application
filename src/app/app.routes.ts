import { Routes } from '@angular/router';
import {LogInComponent} from "./components/log-in/log-in.component";
import {ChatComponent} from "./components/chat/chat.component";
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {path:'login', component: LogInComponent},
  {path:'', component: ChatComponent, canActivate: [authGuard]}, // Protect the main page
];
