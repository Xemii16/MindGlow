import {Component} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem, MatListItemMeta, MatListItemTitle} from "@angular/material/list";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {TeacherDeleteConfirmComponent} from "./teacher-delete-confirm/teacher-delete-confirm.component";

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [
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
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent {
  hasNext: boolean = false;

  constructor(
    public dialog: MatDialog
  ) {
  }

  openDialog(id: string) {
    const dialogRef = this.dialog.open(TeacherDeleteConfirmComponent, {
      data: {
        user: {
          id: id
        }
      }
    });
  }
}
