import {HttpInterceptorFn} from '@angular/common/http';
import {JwtService} from "../../service/jwt/jwt.service";
import {inject} from "@angular/core";

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
    const jwtService = inject(JwtService);
    let token = jwtService.getAccessToken();
    if (req.url.endsWith('refresh-token')) {
        //TODO fix this
        token = jwtService.getRefreshToken();
    }
    if (token === null) next(req);
    const clonedRequest = req.clone({
        setHeaders: {
            Authorization: 'Bearer ' + token,
        },
    });
    return next(clonedRequest);
};
