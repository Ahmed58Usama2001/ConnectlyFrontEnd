import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);
  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            if(error.error.errors){
              const modalStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modalStateErrors.push(error.error.errors[key]);
                }
              }
              throw modalStateErrors.flat();
            }
            else{
              toast.Error(error.error.message, error.error.statusCode);
            }
            break;
          case 401:
            toast.Error('Unauthorized. Please log in.')
            break;
          case 404:
            toast.Error('Resource not found.');
            break;
          case 500:
            toast.Error('Internal Server Error.');
            break;
          default:
            toast.Error('An unexpected error occurred.');
            break;
        }
      }

      throw error;
    })
  );
};
