import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
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
