import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token (you might need to adapt this to your needs)
    const token = localStorage.getItem('token');

    if (request.url.includes('/rolepublic-role')) {
      // If it's the roles API, do not add the Authorization header
      return next.handle(request);
    }

    // For other requests, add the token to the headers
    // if (token) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    // }
    
    // Pass the cloned request instead of the original request
    return next.handle(request);
  }
}
