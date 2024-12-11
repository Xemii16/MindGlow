import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {AuthenticationService} from "../../../service/authentication/authentication.service";
import {UserService} from "../../../service/user/user.service";
import {FormService} from "../../../service/form/form.service";
import {Router} from "@angular/router";

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
        private formService: FormService,
        private userService: UserService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        const user = this.userService.getUserByToken();
        user.then(response => {
            if (response === null) return;
            this.email = response.email ?? "";
            if (response.enabled) {
                this.router.navigate(['dashboard']);
            }
        });
    }


    logout(): void {
        this.formService.logout();
    }
}
