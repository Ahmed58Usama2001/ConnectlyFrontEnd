import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AccounService } from '../services/accoun.service';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) =>{
  const accountService = inject(AccounService);
  const router = inject(Router);
  
  const user = accountService.currentUser();  

 
  
  let authReq = req;
  if (user && user.token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        accountService.logout().subscribe();
        router.navigate(['/home']);
      }
      
      return throwError(() => error);
    })
  );
};