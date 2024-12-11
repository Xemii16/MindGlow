import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatList, MatListItem, MatListItemMeta, MatListItemTitle} from "@angular/material/list";
import {MatMenu, MatMenuItem} from "@angular/material/menu";
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {UserResponse} from "../../../service/user/response/user.response";
import {UserService} from "../../../service/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {PupilDeleteConfirmComponent} from "../pupils-all/pupil-delete-confirm/pupil-delete-confirm.component";
import {SubjectService} from "../../../service/subject/subject.service";
import {SubjectResponse} from "../../../service/subject/subject.response";

@Component({
  selector: 'app-pupils-subjects',
  standalone: true,
    imports: [
        MatButton,
        MatCheckbox,
        MatDivider,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatList,
        MatListItem,
        MatListItemMeta,
        MatListItemTitle,
        MatMenu,
        MatMenuItem,
        MatPrefix,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './pupils-subjects.component.html',
  styleUrl: './pupils-subjects.component.scss'
})
export class PupilsSubjectsComponent {
  user?: UserResponse;
  subjects: SubjectResponse[] = [];
  subjectsStudents: SubjectStudents[] = [];

  constructor(
    private userService: UserService,
    private subjectService: SubjectService
  ) {
  }

  ngOnInit(): void {
    this.getStudents();
    this.userService.getUserByToken().then(user => {
      if (user == null) return;
      this.user = user;
    });
  }

  private getStudents() {
    this.subjectService.getSubjects().then(subjects => {
      if (subjects == null) {
        return;
      }
      this.subjects.push(...subjects);
      this.subjects.forEach(subject => {
        this.subjectService.getStudents(subject.id).then(students => {
          if (students == null) {
            return;
          }
          this.subjectsStudents.push({subject, students});
        });
      });
    });
  }
}

interface SubjectStudents {
  subject: SubjectResponse;
  students: UserResponse[];
}
