import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
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
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ErrorMessageHandler} from "../../../utility/error-message.handler";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog} from "@angular/material/dialog";
import {HttpClientUserService} from "../../../services/user/http-client-user.service";
import {User} from "../../../services/user/user";
import {RequestDeleteConfirmComponent} from "./request-delete-confirm/request-delete-confirm.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-request-approval',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatToolbar,
    MatIcon,
    MatTooltip,
    MatButton,
    MatIconButton
  ],
  templateUrl: './request-approval.component.html',
  styleUrl: './request-approval.component.scss'
})
export class RequestApprovalComponent implements OnInit {
  validator: Validator = new RoleValidator();
  options: string[] = ['Студент', 'Вчитель'];
  request: FormGroup = new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      updateOn: 'blur'
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      updateOn: 'blur'
    }),
    role: new FormControl('', {
      validators: [this.validator.validate.bind(this.validator)],
      updateOn: 'blur'
    })
  });
  errorHandlers: RequestApprovalErrorHandlers = {
    firstName: new ErrorMessageHandler('Введіть ім\'я', '', "Ім'я має мати більше більше ніж 1 символ"),
    lastName: new ErrorMessageHandler('Введіть прізвище', '', "Прізвище має мати більше більше ніж 1 символ"),
  };

  user?: User;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private userService: HttpClientUserService,
              public dialog: MatDialog
  ) {
    const {firstName, lastName} = this.request.controls;
    merge(firstName.valueChanges, firstName.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.errorHandlers.firstName.updateErrorMessage(firstName));
    merge(lastName.valueChanges, lastName.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.errorHandlers.lastName.updateErrorMessage(lastName));
  }

  returnBackPage() {
    this.location.back();
  }

  openDialog() {
    this.dialog.open(RequestDeleteConfirmComponent, {
      data: {user: this.user}
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id === null) return;
    this.userService.getUserById(id).then(response => {
      this.user = response;
      const {role, email, firstName, lastName} = this.request.controls;
      role.setValue(this.user.role === 'TEACHER' ? 'Вчитель' : 'Студент');
      email.setValue(this.user.email);
      firstName.setValue(this.user.firstname);
      lastName.setValue(this.user.lastname);
    })
  }

  onSubmit() {
    if (this.request.invalid) {
      this.request.markAllAsTouched();
      return;
    }
    const {firstName, lastName, role, email} = this.request.controls;
    const userId: number = Number(this.route.snapshot.paramMap.get('id'));
    if (userId === null) return;
    this.userService.changeUserById(userId, {
      id: -1,
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      role: role.value === 'Вчитель' ? 'TEACHER' : 'PUPIL',
      locked: false,
      enabled: true
    }).then(() => {
      this.location.back();
    });
  }
}

interface RequestApprovalErrorHandlers {
  firstName: ErrorMessageHandler;
  lastName: ErrorMessageHandler;
}

export class RoleValidator implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === "Вчитель" || value === "Студент") {
      return null;
    }
    return {invalidRole: true};
  }


}
