import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {UserResponse} from "../../service/user/response/user.response";
import {UserService} from "../../service/user/user.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {
  MatCard, MatCardActions, MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {SubjectResponse} from "../../service/subject/subject.response";
import {SubjectService} from "../../service/subject/subject.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {PupilDeleteConfirmComponent} from "../pupils/pupils-all/pupil-delete-confirm/pupil-delete-confirm.component";
import {SubjectCreateComponent} from "./subject-create/subject-create.component";
import {RouterLink} from "@angular/router";

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
    MatCardAvatar,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent implements OnInit {
  user?: UserResponse;
  subjects: SubjectResponse[] = [];
  constructor(
    private subjectService: SubjectService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.userService.getUserByToken().then(response => {
      if (!response) return;
      this.user = response;
    });
    this.subjectService.getSubjects().then((subjects) => {
      if (!subjects) return;
      this.subjects = subjects;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(SubjectCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === null || result === undefined) return;
      this.subjects.push(result);
    });
  }

  protected readonly open = open;
}
