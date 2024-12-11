import {Injectable} from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";
import {AuthenticationResponse} from "../authentication/authentication.response";
import {JwtService} from "../jwt/jwt.service";
import {Router} from "@angular/router";
import {UserService} from "../user/user.service";

@Injectable({
    providedIn: 'root'
})
export class FormService {

    constructor(
        private authenticationService: AuthenticationService,
        private jwtService: JwtService,
        private router: Router,
        private userService: UserService
    ) {
    }

    register(email: string, firstName: string, lastName: string, password: string): void {
        const isRegisterSuccess: Promise<AuthenticationResponse | null> = this.authenticationService.register({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            //TODO add another roles
            role: 'STUDENT'
        });
        isRegisterSuccess.then((response: AuthenticationResponse | null) => {
            if (response === null) {
                // Тут немає бути помилок (якщо будуть, то хз що робити)
                throw new Error('Registration failed');
            }
            this.jwtService.saveTokens(response.access_token, response.refresh_token);
            this.router.navigate(['pending']);
        });
    }

    authenticate(email: string, password: string, remember: boolean): Promise<boolean> {
        const isAuthenticated: Promise<AuthenticationResponse | null> = this.authenticationService.authenticate(email, password, remember);
        return new Promise<boolean>((resolve) => {
            isAuthenticated.then((response: AuthenticationResponse | null) => {
                if (response === null) {
                    resolve(false)
                    return;
                }
                this.jwtService.saveTokens(response.access_token, response.refresh_token);
                this.userService.getUserByToken().then(response => {
                  if (response === null) return;
                  if (!response.enabled) {
                      this.router.navigate(['pending']);
                      resolve(true)
                      return;
                  }
                  this.router.navigate(['dashboard']).then(() => resolve(true));
                });
            });
        });
    }

    logout(): void {
      this.router.navigate(['login']).then(() => this.jwtService.removeTokens())
    }
}
