import {Component, Injectable} from '@angular/core';
import {
    AbstractControl,
    AsyncValidator,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    Validator,
    Validators
} from "@angular/forms";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {merge, Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ErrorMessageHandler} from "../../utility/error-message.handler";
import {MatIcon} from "@angular/material/icon";
import {HttpClientUserService} from "../../services/user/http-client-user.service";

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        FormsModule,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        MatButton,
        RouterLink,
        ReactiveFormsModule,
        MatIconButton,
        MatIcon,
        MatFormFieldModule,
        MatAnchor
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    registerForm: FormGroup = new FormGroup({
        email: new FormControl('', {
            validators: [Validators.required, Validators.email],
            asyncValidators: [this.emailValidator.validate.bind(this.emailValidator)],
            updateOn: 'blur'
        }),
        firstName: new FormControl('', {
            validators: [Validators.required],
            updateOn: 'blur'
        }),
        lastName: new FormControl('', {
            validators: [Validators.required],
            updateOn: 'blur'
        }),
        password: new FormControl('', {
            validators: [Validators.required, Validators.minLength(8)],
            updateOn: 'blur'
        })
    });
    errorHandlers: RegisterErrorHandlers = {
        email: new ErrorMessageHandler('Введіть пошту', 'Недійсна пошта', 'Ця пошта уже зайнята'),
        firstName: new ErrorMessageHandler('Введіть ім\'я'),
        lastName: new ErrorMessageHandler('Введіть прізвище'),
        password: new ErrorMessageHandler('Введіть пароль', '', 'Пароль повинен містити принаймні 8 символів'),
        confirmPassword: new ErrorMessageHandler('Повторіть пароль', '', 'Паролі не співпадають')
    };
    confirmPassword: FormControl = new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
    });
    hidePassword: boolean = true;

    constructor(
        private emailValidator: TakenEmailValidator,
        private userService: HttpClientUserService,
        private router: Router,
    ) {
        const emailControl = this.registerForm.get('email');
        const firstNameControl = this.registerForm.get('firstName');
        const lastNameControl = this.registerForm.get('lastName');
        const passwordControl = this.registerForm.get('password');
        if (passwordControl) {
            const confirmPasswordValidator = new ConfirmPasswordValidator(passwordControl);
            this.confirmPassword.addValidators(confirmPasswordValidator.validate.bind(confirmPasswordValidator));
        }
        const confirmPasswordControl = this.confirmPassword;
        if (emailControl && firstNameControl && lastNameControl && passwordControl && confirmPasswordControl) {
            merge(emailControl.events)
                .pipe(takeUntilDestroyed())
                .subscribe(() => this.errorHandlers.email.updateErrorMessage(emailControl));
            merge(firstNameControl.events)
                .pipe(takeUntilDestroyed())
                .subscribe(() => this.errorHandlers.firstName.updateErrorMessage(firstNameControl));
            merge(lastNameControl.events)
                .pipe(takeUntilDestroyed())
                .subscribe(() => this.errorHandlers.lastName.updateErrorMessage(lastNameControl));
            merge(passwordControl.events)
                .pipe(takeUntilDestroyed())
                .subscribe(() => this.errorHandlers.password.updateErrorMessage(passwordControl));
            merge(confirmPasswordControl.events)
                .pipe(takeUntilDestroyed())
                .subscribe(() => this.errorHandlers.confirmPassword.updateErrorMessage(confirmPasswordControl));
        } else {
            throw new Error('Form controls are not initialized');
        }
    }

    clickEvent(event: MouseEvent) {
        this.hidePassword = !this.hidePassword;
        event.stopPropagation();
    }

    onSubmit(): void {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            this.confirmPassword?.markAsTouched();
            return;
        }
        this.userService.register(
          {
            firstname : this.registerForm.get('firstName')?.value,
            email : this.registerForm.get('email')?.value,
            lastname : this.registerForm.get('lastName')?.value,
            password : this.registerForm.get('password')?.value
          }
        ).then(bool => {
          if (bool) {
            this.router.navigate(['/dashboard']);
          }
        }).catch(error => {
          this.registerForm.markAllAsTouched();
          this.confirmPassword?.markAsTouched();
        });
    }
}

interface RegisterErrorHandlers {
    email: ErrorMessageHandler;
    firstName: ErrorMessageHandler;
    lastName: ErrorMessageHandler;
    password: ErrorMessageHandler;
    confirmPassword: ErrorMessageHandler;
}

@Injectable({providedIn: 'root'})
export class TakenEmailValidator implements AsyncValidator {
    constructor(
      private userService: HttpClientUserService,
    ) {
    }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return new Promise((resolve) => {
            this.userService.getInformationByEmail(control.value).then(email => {
              if (email.taken) {
                resolve({ taken : true});
                return;
              }
              resolve(null);
            }).catch(() => {
              resolve({ taken : true});
            })
        });
    }

}

export class ConfirmPasswordValidator implements Validator {
    constructor(private passwordControl: AbstractControl<any, any>) {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return control.value === this.passwordControl.value ? null : {notMatch: true};
    }


}
