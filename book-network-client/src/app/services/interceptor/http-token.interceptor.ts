import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable()
export class HttpTokenInterceptor implements HttpTokenInterceptor {
  constructor(private tokenservice: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.tokenservice.token;
    if (token) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authReq);
    }

    return next.handle(request);
  }

  //Interceptor must be binded at providers in app.config.ts to function
}
