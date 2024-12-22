import {Component} from '@angular/core';
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
export class SubjectOverviewPupilsComponent {

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getStudents();
    /*this.userService.getUserByToken().then(user => {
      if (user == null) return;
      this.user = user;
    });*/
  }

  private getStudents() {
    /*this.subjectService.getStudents(this.getSubjectId()).then(students => {
      if (students == null) {
        return;
      }
      this.pupils.push(...students);
    });*/
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddPupilDialogComponent, {
      data: {
        id: this.getSubjectId()
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      /*this.pupils = [];*/
      this.getStudents();
    });
  }

  getSubjectId(): string {
    return this.activatedRoute.parent?.snapshot.params['id'];
  }

  deletePupilFromSubject(id: string) {
    /*this.subjectService.deletePupilFromSubject(this.getSubjectId(), id).then(b => {
      if (b) this.pupils = this.pupils.filter(pupil => pupil.id !== id);
    });*/
  }
}
