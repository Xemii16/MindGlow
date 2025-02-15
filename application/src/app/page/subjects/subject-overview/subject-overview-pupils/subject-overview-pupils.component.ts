import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem, MatListItemMeta, MatListItemTitle} from "@angular/material/list";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgForOf, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {AddPupilDialogComponent} from "./add-pupil-dialog/add-pupil-dialog.component";
import {HttpClientUserService} from "../../../../services/user/http-client-user.service";
import {User} from "../../../../services/user/user";
import {SubjectService} from "../../../../services/subject/subject.service";
import {Pupil} from "../../../../services/subject/pupil";
import {HttpClientSubjectService} from "../../../../services/subject/http-client-subject.service";

@Component({
  selector: 'app-subject-overview-pupils',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCheckbox,
    MatDivider,
    MatIcon,
    MatIconButton,
    MatList,
    MatListItem,
    MatListItemMeta,
    MatListItemTitle,
    MatMenu,
    MatMenuItem,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatMenuTrigger
  ],
  templateUrl: './subject-overview-pupils.component.html',
  styleUrl: './subject-overview-pupils.component.scss'
})
export class SubjectOverviewPupilsComponent implements OnInit {
  user?: User;
  pupils: User[] = [];

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private userService: HttpClientUserService,
    private subjectService: HttpClientSubjectService,
  ) {
  }

  ngOnInit(): void {
    this.getStudents();
    this.userService.getCurrentUser().then(user => {
      this.user = user;
    })
  }

  private getStudents() {
    this.subjectService.getPupilsBySubject(this.getSubjectId()).then(pupils => {
      pupils.forEach(pupil => {
        this.userService.getUserById(pupil.id).then(user => {
          this.pupils.push(user);
        })
      })
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddPupilDialogComponent, {
      data: {
        id: this.getSubjectId()
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.pupils = [];
      this.getStudents();
    });
  }

  getSubjectId(): number {
    return this.activatedRoute.parent?.snapshot.params['id'];
  }

  deletePupilFromSubject(id: number) {
    this.subjectService.deletePupilsFromSubject(this.getSubjectId(), [id]).then(result => {
      this.pupils = this.pupils.filter(pupil => pupil.id !== id);
    })
  }
}
