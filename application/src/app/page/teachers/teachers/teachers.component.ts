import {Component, OnInit} from '@angular/core';
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
import {HttpClientUserService} from "../../../services/user/http-client-user.service";
import {User} from "../../../services/user/user";

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
export class TeachersComponent implements OnInit {
  teachers: User[] = [];

  constructor(
    public dialog: MatDialog,
    private userService: HttpClientUserService,
  ) {
  }

  ngOnInit() {
    this.userService.getAllUsers("teachers").then((response) => {
      this.teachers = response;
    })
  }

  openDialog(id: number) {
    this.userService.getUserById(id).then(user => {
      this.dialog.open(TeacherDeleteConfirmComponent, {
        data: {
          user: user
        }
      });
    });
  }
}
