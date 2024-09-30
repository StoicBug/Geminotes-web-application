import {Component, inject, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Auth, signOut} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  private auth: Auth = inject(Auth);
  router: Router = inject(Router);
  // @ts-ignore
  userPhoto: string|null;

  ngOnInit(): void {
    // @ts-ignore
    this.userPhoto = JSON.parse(sessionStorage.getItem('user')).user.photoURL
  }


  logout() {
    signOut(this.auth).then(r => {
      //remove from session storage
      sessionStorage.removeItem('user');
      //
      this.router.navigate(['/login']);
    });
  }

}
