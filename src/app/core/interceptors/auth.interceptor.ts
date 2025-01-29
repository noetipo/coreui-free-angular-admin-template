import {HttpInterceptorFn} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = 'access-tokenkfjodjfioedjfienfinvjdnvjsnvksnvjkdnsvkjndsjvkndfjkvnjkvnjksnvskjdnvkjjvsdnvjnvnvjdn';
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  })
  return next(authReq);
};
