import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {HttpClientAuthenticationService} from "../../../services/authentication/http-client-authentication.service";

@Component({
  selector: 'app-register-pending',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './register-pending.component.html',
  styleUrl: './register-pending.component.scss'
})
export class RegisterPendingComponent implements OnInit {
  email: string = '';

  constructor(
    private router: Router,
    private authenticationService: HttpClientAuthenticationService
  ) {
  }

  ngOnInit(): void {
    /*const user = this.userService.getUserByToken();*/
    /*user.then(response => {
        if (response === null) return;
        this.email = response.email ?? "";
        if (response.enabled) {
            this.router.navigate(['dashboard']);
        }
    });*/
  }


  logout(): void {
    this.authenticationService.logout().then(() => {
      this.router.navigate(['login']);
    });
  }
}
