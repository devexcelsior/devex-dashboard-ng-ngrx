import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = req;

    if (url.endsWith('/api/login') && method === 'POST') {
      const mockUser = {
        id: 1,
        firstName: 'John',
        lastName: 'Intercepted Request',
        email: 'you@yourdomain.com',
      };

      return of(
        new HttpResponse({ status: 200, body: JSON.stringify(mockUser) })
      ).pipe(delay(500));
    }

    // if there is not any matches return default request.
    return next.handle(req);
  }
}
