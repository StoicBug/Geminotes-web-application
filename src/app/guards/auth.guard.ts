import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return user(auth).pipe(
    take(1),
    map(user => {
      if (user) {
        return true; // User is authenticated
      } else {
        router.navigate(['/login']); // Redirect to login if not authenticated
        return false; // User is not authenticated
      }
    })
  );
};