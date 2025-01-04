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
    /*const findTeacher = this.teachers.find(user => user.lastname + ' ' + user.firstname === teacher.value);
    if (!findTeacher) {
      this.createSubjectHandlers.teacher.updateErrorMessage(teacher);
      return;
    }
    if (name.value === null || description.value === null) return;
    this.subjectService.createSubject({
      name: name.value,
      description: description.value,
      teacher_id: Number(findTeacher.id)
    }).then(response => {
      if (response === null) return;
      this.dialogRef.close(response);
    });*/
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
  constructor() {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve) => {
      /*this.service.getTeachers().then(response => {
        if (response) {
          if (response.users.find(user => user.lastname + ' ' + user.firstname === control.value)) {
            resolve(null);
          }
          resolve({teacherNotFound: true});
        } else {
          resolve({teacherNotFound: true});
        }
      });*/
    });
  }

}
