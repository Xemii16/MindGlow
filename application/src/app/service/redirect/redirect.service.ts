import {Injectable} from '@angular/core';
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  checkAuthorization(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const user = this.userService.getUserByTokenAsync();
      user.then(response => {
        if (response === null) {
          this.router.navigate(['login']).then(() => {
            console.log('User is not authorized. Redirect to login page (redirect service)');
            resolve(true);
          })
          return;
        }
        if (!response.enabled) {
          this.router.navigate(['pending']).then(() => {
            console.log('User is not enabled. Redirect to pending page (redirect service)');
            resolve(true);
          })
        } else {
          this.router.navigate(['dashboard']).then(() => {
            resolve(true);
          });
        }
      })
    });
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]).then(() => console.debug('Reload current route: ' + currentUrl));
    });
  }
}
