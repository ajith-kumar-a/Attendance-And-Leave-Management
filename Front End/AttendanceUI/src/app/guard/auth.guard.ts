import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const allowedRoles = route.data['roles'] as Array<string>;

    if (this.authService.isLoggedIn()) {
      return this.authService.getUserDetails('userme/').pipe(
        switchMap(userDetailsResponse => {
          const userDetails = userDetailsResponse as { data: { role_id: number } };
          const userRoleId = userDetails.data.role_id;

          return this.authService.getRoles('rolepublic-roles/').pipe(
            map(rolesResponse => {
              const roleData = rolesResponse as { data: { id: number, role_name: string }[] };
              const roleList = roleData.data;
              const userRole = roleList.find(role => role.id === userRoleId)?.role_name;

              if (typeof userRole === 'string' && allowedRoles.includes(userRole)) {
                return true;
              } else {
                this.router.navigate(['/unauthorized']);
                return false;
              }
            }),
            catchError(() => {
              this.router.navigate(['/unauthorized']);
              return of(false);
            })
          );
        }),
        catchError(() => {
          this.router.navigate(['/unauthorized']);
          return of(false);
        })
      );
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
