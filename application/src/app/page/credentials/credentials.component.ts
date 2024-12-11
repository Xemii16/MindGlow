import {Component, OnInit} from '@angular/core';
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgOptimizedImage} from "@angular/common";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validator, Validators
} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {UserResponse} from "../../service/user/response/user.response";
import {UserService} from "../../service/user/user.service";
import {ErrorMessageHandler} from "../../utility/error-message.handler";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {JwtService} from "../../service/jwt/jwt.service";

@Component({
  selector: 'app-credentials',
  standalone: true,
  imports: [
    MatAnchor,
    MatButton,
    MatCheckbox,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    NgOptimizedImage,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './credentials.component.html',
  styleUrl: './credentials.component.scss'
})
export class CredentialsComponent implements OnInit {
  user?: UserResponse;
  credentialsForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    })
  });
  credentialsErrorHandlers: CredentialsErrorHandlers = {
    email: new ErrorMessageHandler('Введіть пошту', 'Некоректна пошта', ''),
    lastName: new ErrorMessageHandler('Введіть прізвище', '', ''),
    firstName: new ErrorMessageHandler("Введіть ім'я", '', ''),
    password: new ErrorMessageHandler('Введіть пароль', '', 'Пароль має бути більше 8 символів'),
    confirmPassword: new ErrorMessageHandler('Підтвердіть пароль', '', 'Паролі не співпадають')
  };
  hidePassword: boolean = true;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private jwtService: JwtService
  ) {
    const {email, lastName, firstName, password, confirmPassword} = this.credentialsForm.controls;
    merge(email.statusChanges, email.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.credentialsErrorHandlers.email.updateErrorMessage(email));
    merge(lastName.statusChanges, lastName.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.credentialsErrorHandlers.lastName.updateErrorMessage(lastName));
    merge(firstName.statusChanges, firstName.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.credentialsErrorHandlers.firstName.updateErrorMessage(firstName));
    merge(password.statusChanges, password.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.credentialsErrorHandlers.password.updateErrorMessage(password));
    merge(confirmPassword.statusChanges, confirmPassword.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.credentialsErrorHandlers.confirmPassword.updateErrorMessage(confirmPassword));
    const confirmPasswordValidator = new ConfirmPasswordValidator(password);
    confirmPassword.setValidators(confirmPasswordValidator.validate.bind(confirmPasswordValidator));
  }
  ngOnInit(): void {
      this.userService.getUserByToken().then(response => {
        if (response === null) return;
        this.user = response;
        const {email, lastName, firstName, password} = this.credentialsForm.controls;
        email.setValue(response.email);
        lastName.setValue(response.lastname);
        firstName.setValue(response.firstname);
        password.setValue('');
      });
  }


  onSubmit() {
    if (this.credentialsForm.invalid) {
      this.credentialsForm.markAllAsTouched();
      return;
    }
    const {email, lastName, firstName, password} = this.credentialsForm.controls;
    this.userService.changeCredentials({
      email: email.value,
      lastName: lastName.value,
      firstName: firstName.value,
      password: password.value
    }).then(response => {
      if (!response) {
        this.credentialsErrorHandlers.email.updateErrorMessage(email);
        this.credentialsErrorHandlers.lastName.updateErrorMessage(lastName);
        this.credentialsErrorHandlers.firstName.updateErrorMessage(firstName);
        this.credentialsErrorHandlers.password.updateErrorMessage(password);
        return;
      }
      this.authenticationService.authenticate(email.value, password.value, true).then(response => {
        if (response === null) return;
        this.jwtService.saveTokens(response.access_token, response.refresh_token);
        this.router.navigate(['dashboard']);
      });
    });
  }

  clickEvent($event: MouseEvent) {
    this.hidePassword = !this.hidePassword;
    $event.stopPropagation();
  }

  logout() {
    this.jwtService.removeTokens();
    this.router.navigate(['/login']);
  }
}

interface CredentialsErrorHandlers {
  email: ErrorMessageHandler;
  lastName: ErrorMessageHandler;
  firstName: ErrorMessageHandler;
  password: ErrorMessageHandler;
  confirmPassword: ErrorMessageHandler;
}

export class ConfirmPasswordValidator implements Validator {
  constructor(private passwordControl: AbstractControl<any, any>) {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value === this.passwordControl.value ? null : {notMatch: true};
  }


}
