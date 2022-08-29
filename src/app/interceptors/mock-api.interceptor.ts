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
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');

    const requestObject = {
      setHeaders: {
        Accept: 'application/json',
        'Accept-Version': '<=1.0.0',
        Authorization: '',
      },
    };

    if (token) {
      requestObject.setHeaders['Authorization'] = `Bearer ${token}`;
    }

    request = request.clone(requestObject);
    return next.handle(request);
  }
}
