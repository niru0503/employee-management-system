import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * HTTP Interceptor to add JWT token to all outgoing requests
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private tokenKey = 'ems_auth_token';

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(this.tokenKey);

    // Add authorization header with jwt token if available
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
