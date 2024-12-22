import {Component} from '@angular/core';
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatCheckbox} from "@angular/material/checkbox";
import {
    AbstractControl,
    FormControl, FormGroup,
    FormGroupDirective,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {merge, take} from "rxjs";
import {ErrorMessageHandler} from "../../utility/error-message.handler";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        MatLabel,
        NgOptimizedImage,
        MatFormField,
        MatInput,
        MatIcon,
        MatIconButton,
        RouterLink,
        MatCheckbox,
        MatButton,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        NgIf,
        RouterOutlet,
        MatAnchor
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        rememberMe: new FormControl(false)
    });
    loginErrorHandlers: LoginErrorHandlers = {
        email: new ErrorMessageHandler('Введіть пошту', 'Недійсна пошта', 'Неправильна пошта або пароль'),
        password: new ErrorMessageHandler('Введіть пароль', '', 'Неправильна пошта або пароль')
    };
    hidePassword: boolean = true;

    constructor(
        private router: Router) {
        const {email, password, rememberMe}= this.loginForm.controls;
        merge(email.statusChanges, email.valueChanges, email.updateOn)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.loginErrorHandlers.email.updateErrorMessage(email));
        merge(password.statusChanges, password.valueChanges, email.updateOn)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.loginErrorHandlers.password.updateErrorMessage(password));
    }

    clickEvent(event: MouseEvent) {
        this.hidePassword = !this.hidePassword;
        event.stopPropagation();
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        const {email, password, rememberMe}= this.loginForm.controls;
        /*this.formService.authenticate(email.value, password.value, rememberMe.value).then((isAuthenticated: boolean) => {
            if (!isAuthenticated) {
                this.setInputErrors();
            }
        });*/
    }

    setInputErrors(): void {
        const {email, password}= this.loginForm.controls;
        email.setErrors({invalidCredentials: true});
        password.setErrors({invalidCredentials: true});
        merge(email.valueChanges)
            .pipe(take(1))
            .subscribe(() => email.setErrors(null));
        merge(password.valueChanges)
            .pipe(take(1))
            .subscribe(() => password.setErrors(null));
    }
}

interface LoginErrorHandlers {
    email: ErrorMessageHandler;
    password: ErrorMessageHandler;
}



