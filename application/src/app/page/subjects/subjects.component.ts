import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {SubjectCreateComponent} from "./subject-create/subject-create.component";
import {RouterLink} from "@angular/router";
import {User} from "../../services/user/user";
import {Subject} from "../../services/subject/subject";
import {HttpClientUserService} from "../../services/user/http-client-user.service";
import {HttpClientSubjectService} from "../../services/subject/http-client-subject.service";

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardTitleGroup,
    MatCardActions,
    MatIconButton,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent implements OnInit {

  user?: User;
  subjects: SubjectAdditional[] = []

  constructor(
    public dialog: MatDialog,
    private userService: HttpClientUserService,
    private subjectService: HttpClientSubjectService
  ) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().then(user => this.user = user);
    this.subjectService.getAllSubjects().then(subjects => {
      subjects.forEach(subject => {
        this.userService.getUserById(subject.teacher_id).then(teacher => {
          this.subjects.push({subject: subject, teacher: teacher});
        });
      });
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(SubjectCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === null || result === undefined) return;
    });
  }
}

interface SubjectAdditional {
  subject: Subject;
  teacher: User;
}
