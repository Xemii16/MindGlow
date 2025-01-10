import {Component, Injectable, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {
  AbstractControl,
  AsyncValidator,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {ErrorMessageHandler} from "../../../utility/error-message.handler";
import {merge, Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {HttpClientUserService} from "../../../services/user/http-client-user.service";
import {SubjectService} from "../../../services/subject/subject.service";
import {HttpClientSubjectService} from "../../../services/subject/http-client-subject.service";

@Component({
  selector: 'app-request-delete-confirm',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,

  ],
  templateUrl: './subject-create.component.html',
  styleUrl: './subject-create.component.scss'
})
export class SubjectCreateComponent implements OnInit {
  disabled: boolean = false;
  subjectCreateGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl<string>('', [Validators.required, Validators.minLength(20)]),
    teacher: new FormControl<string>('', {
      validators: [Validators.required],
      asyncValidators: [this.teacherValidator.validate.bind(this.teacherValidator)],
      updateOn: 'blur'
    })
  });
  createSubjectHandlers: CreateSubjectHandlers = {
    name: new ErrorMessageHandler('Введіть назву', '', 'Назва має бути більше за 3 букви'),
    description: new ErrorMessageHandler('Введіть опис', '', 'Опис має бути більше за 20 символів'),
    teacher: new ErrorMessageHandler('Виберіть вчителя', '', 'Такого вчителя не існує')
  }

  constructor(
    public dialogRef: MatDialogRef<SubjectCreateComponent>,
    private teacherValidator: TeacherValidator,
    private userService: HttpClientUserService,
    private subjectService: HttpClientSubjectService,
  ) {
    const {name, description, teacher} = this.subjectCreateGroup.controls;
    merge(name.statusChanges, name.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.createSubjectHandlers.name.updateErrorMessage(name));
    merge(description.statusChanges, description.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.createSubjectHandlers.description.updateErrorMessage(description));
    merge(teacher.statusChanges, teacher.updateOn)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.createSubjectHandlers.teacher.updateErrorMessage(teacher));
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.subjectCreateGroup.enable();
    const {name, description, teacher} = this.subjectCreateGroup.controls;
    this.userService.getAllUsers("teachers").then((users) => {
      const user = users.find(user => user.lastname + ' ' + user.firstname === teacher.value);
      if (!user) {
        this.createSubjectHandlers.teacher.updateErrorMessage(teacher);
        return;
      }
      if (name.value === null || description.value === null) return;
      this.subjectService.createSubject({
        name: name.value,
        description: description.value,
        teacher_id: Number(user.id)
      }).then((subject) => {
        this.dialogRef.close();
      })
    })
  }
}

export interface SubjectData {
  /*subject: SubjectResponse;*/
}

interface CreateSubjectHandlers {
  name: ErrorMessageHandler;
  description: ErrorMessageHandler;
  teacher: ErrorMessageHandler;
}

@Injectable({providedIn: 'root'})
export class TeacherValidator implements AsyncValidator {
  constructor(
    private userService: HttpClientUserService,
  ) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve) => {
      this.userService.getAllUsers("teachers").then(user => {
        if (user.find(user => user.lastname + ' ' + user.firstname === control.value)) {
          resolve(null);
        }
        resolve({teacherNotFound: true});
      })
    });
  }

}
