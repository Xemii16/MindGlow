import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export const authGuard: CanActivateFn = (route, state): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
        /*const userService = inject(UserService);
        const http = inject(HttpClient);
        const router = inject(Router);
        http.get<string>(apiUrl + '/demo-controller').subscribe(response => {
            if (response === "Hello from secured endpoint") {
                resolve(true);
            } else resolve(false);
        });*/
        /*user.then(response => {
            if (response === null) {
                router.navigate(['login']).then(() => {
                    console.debug('User is not authorized. Redirect to login page (auth guard)');
                    resolve(false);
                })
                return;
            }
            if (response.enabled) {
                console.debug('User is enabled. Continue... (auth guard)');
                resolve(true);
            } else {
                router.navigate(['pending']).then(() => {
                    console.debug('User is not enabled. Redirect to pending page (auth guard)');
                    resolve(false);
                })
            }
        })*/
    })
};
