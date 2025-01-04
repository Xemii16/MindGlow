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

  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(SubjectCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === null || result === undefined) return;
    });
  }

  protected readonly open = open;
}
