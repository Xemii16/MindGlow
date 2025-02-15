import {Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators
} from "@angular/forms";
import {Location} from "@angular/common";
import {ErrorMessageHandler} from "../../../utility/error-message.handler";
import {MatIcon} from "@angular/material/icon";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-request-delete-confirm',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatIcon,
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss'
})
export class ChangePasswordDialogComponent implements OnInit {
  changePasswordFormGroup: FormGroup = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    }),
  });
  changePasswordHandlers: ChangePasswordHandlers = {
    currentPassword: new ErrorMessageHandler("Введіть поточний пароль"),
    newPassword: new ErrorMessageHandler('Введіть новий пароль'),
    confirmPassword: new ErrorMessageHandler('Підтвердіть новий пароль', '', 'Паролі не співпадають'),
  }
  hidePassword: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private location: Location,
  ) {
    const {newPassword, confirmPassword, currentPassword} = this.changePasswordFormGroup.controls;
    const confirmPasswordValidator = new ConfirmPasswordValidator(newPassword);
    confirmPassword.addValidators(confirmPasswordValidator.validate.bind(confirmPasswordValidator));
    merge(newPassword.statusChanges, newPassword.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.changePasswordHandlers.newPassword.updateErrorMessage(newPassword));
    merge(currentPassword.statusChanges, currentPassword.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.changePasswordHandlers.currentPassword.updateErrorMessage(currentPassword));
    merge(confirmPassword.statusChanges, confirmPassword.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.changePasswordHandlers.confirmPassword.updateErrorMessage(confirmPassword));
  }

  ngOnInit(): void {
    /*this.userService.getUserByToken().then(response => {
      if (response === null) return;
      this.user = response;
    });*/
  }

  clickEvent(event: MouseEvent) {
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.changePasswordFormGroup.enable();
    if (this.changePasswordFormGroup.invalid) {
      this.changePasswordFormGroup.markAllAsTouched();
      return;
    }
    const {newPassword, currentPassword, confirmPassword} = this.changePasswordFormGroup.controls;
    /*this.userService.changePassword(
      currentPassword.value,
      newPassword.value,
      confirmPassword.value
    ).then(response => {
      if (response){
        if (this.user?.email === undefined) return;
        this.authenticationService.authenticate(this.user.email, newPassword.value, true).then(response => {
          if (response === null) return;
          this.jwtService.saveTokens(response.access_token, response.refresh_token);
          this.dialogRef.close();
        });
      } else this.changePasswordFormGroup.markAsTouched();
    })*/
  }
}

interface ChangePasswordHandlers {
  currentPassword: ErrorMessageHandler;
  newPassword: ErrorMessageHandler;
  confirmPassword: ErrorMessageHandler;
}

export class ConfirmPasswordValidator implements Validator {
  constructor(private passwordControl: AbstractControl<any, any>) {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value === this.passwordControl.value ? null : {notMatch: true};
  }
}

export interface RequestDeleteConfirmData {
  /*user: UserResponse;*/
}
