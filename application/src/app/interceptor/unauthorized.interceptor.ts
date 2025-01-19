import {HttpErrorResponse, HttpInterceptorFn} from "@angular/common/http";
import {catchError} from "rxjs";
import {Router} from "@angular/router";
import {inject} from "@angular/core";

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(catchError((error: HttpErrorResponse)=> {
    if (error.status === 401) {
      router.navigate(['/login']);
    }
    throw error;
  }));
}
