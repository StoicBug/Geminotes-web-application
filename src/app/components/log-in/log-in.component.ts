import {Component, inject} from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})

export class LogInComponent {
  private auth: Auth = inject(Auth);
  router: Router = inject(Router);
  user$ = user(this.auth);



  login() {
    const provider = new GoogleAuthProvider();

    // Add the Google Keep scopes
    provider.addScope('https://www.googleapis.com/auth/keep');
    provider.addScope('https://www.googleapis.com/auth/keep.readonly');


    signInWithPopup(this.auth, new GoogleAuthProvider()).then(r => {

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(r);
      const token = credential?.accessToken;

      const user = r.user;

      //store in session storage
      sessionStorage.setItem('user', JSON.stringify(r));
      //
      this.router.navigate(['/']);
    }).catch(e => console.error(e));
  }


}
