import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncryptionService } from './views/pages/auth/services/encryption.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private encryptionService: EncryptionService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userEncryptedData = localStorage.getItem('user') || '';
    const userDecryptedData = this.encryptionService.decrypt(userEncryptedData);
    const currentUser = JSON.parse(userDecryptedData);

    let newQueryParams = request.params.append(
      'user_auth_id',
      currentUser.userId
    );

    request = request.clone({
      params: newQueryParams,
    });

    return next.handle(request);
  }
}
