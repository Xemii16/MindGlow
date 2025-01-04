import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
    let token = /*jwtService.getAccessToken();*/ null;
    if (req.url.endsWith('refresh-token')) {
        //TODO fix this
        /*token = jwtService.getRefreshToken();*/
    }
    if (token === null) next(req);
    const clonedRequest = req.clone({
        setHeaders: {
            Authorization: 'Bearer ' + token,
        },
    });
    return next(clonedRequest);
};
