import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getUserDetails('userme/').pipe(
      map(user => {
        if (user && user.data) {
          const roleId = user.data.role_id;
          // Define which roles can access which routes
          const allowedRoles = this.getAllowedRolesForRoute();
          if (allowedRoles.includes(roleId)) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }

  private getAllowedRolesForRoute(): number[] {
    // Define roles that have access to the current route here
    // Example: return [1, 2] for roles with IDs 1 and 2
    // Modify according to your requirements
    const url = window.location.pathname;
    switch (url) {
      case '/Student':
        return [1]; // Role ID 1
      case '/Teacher':
        return [2]; // Role ID 2
      case '/Staff':
        return [3]; // Role ID 3
      case '/Admin':
        return [4]; // Role ID 4
      default:
        return [];
    }
  }
}
