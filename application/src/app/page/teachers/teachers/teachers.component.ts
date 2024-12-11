import {Component} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDivider} from "@angular/material/divider";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatList, MatListItem, MatListItemMeta, MatListItemTitle} from "@angular/material/list";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {UserResponse} from "../../../service/user/response/user.response";
import {UserService} from "../../../service/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {TeacherDeleteConfirmComponent} from "./teacher-delete-confirm/teacher-delete-confirm.component";

@Component({
  selector: 'app-teachers',
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
    ReactiveFormsModule,
    MatMenuTrigger
  ],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent {
  teachers: UserResponse[] = [];
  hasNext: boolean = false;
  user?: UserResponse;

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getPupils();
    this.userService.getUserByToken().then(user => {
      if (user == null) return;
      this.user = user;
    });
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

  private getPupils() {
    this.userService.getTeachers().then(response => {
      if (response === null) return;
      this.teachers.push(...response.users);
    })
  }
}
