import {Component, OnInit} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatList, MatListItem, MatListItemMeta, MatListItemTitle} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {PupilDeleteConfirmComponent} from "./pupil-delete-confirm/pupil-delete-confirm.component";
import {HttpClientUserService} from "../../../services/user/http-client-user.service";
import {User} from "../../../services/user/user";

@Component({
  selector: 'app-pupils-all',
  standalone: true,
  imports: [
    MatDivider,
    MatCheckbox,
    MatButton,
    MatIcon,
    MatListItemMeta,
    ReactiveFormsModule,
    FormsModule,
    MatList,
    MatListItem,
    MatListItemTitle,
    NgForOf,
    NgIf,
    MatIconButton,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem
  ],
  templateUrl: './pupils-all.component.html',
  styleUrl: './pupils-all.component.scss'
})
export class PupilsAllComponent implements OnInit {
  user?: User;
  pupils: User[] = [];

  constructor(
    public dialog: MatDialog,
    private userService: HttpClientUserService
  ) {
  }

  ngOnInit(): void {
    this.getPupils();
    this.userService.getCurrentUser().then(user => {
      this.user = user;
    })
  }

  reloadPages() {
    /*this.pupils = [];*/
    this.getPupils();
  }

  openDialog(id: number) {
    this.userService.getUserById(id).then(user => {
      const dialogRef = this.dialog.open(PupilDeleteConfirmComponent, {
        data: {
          user: user
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.reloadPages();
      });
    })
  }

  private getPupils() {
    this.userService.getAllUsers('students').then(users => {
      this.pupils = users;
    });
  }
}
