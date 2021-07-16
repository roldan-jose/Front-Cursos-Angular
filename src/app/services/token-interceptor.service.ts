import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private Injjector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authServices = this.Injjector.get(AuthService);
    const TokenRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authServices.getToken()}`
      }
    });
    return next.handle(TokenRequest);
  }
}
