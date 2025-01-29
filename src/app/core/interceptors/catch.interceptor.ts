import {HttpEvent, HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";

export const catchInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse && event.status === 200) {
      }
    }),
    catchError((error) => {
      console.log(error);
      if (error.status === 401) {
      }
      return throwError(() => error);
    })
  );
};
