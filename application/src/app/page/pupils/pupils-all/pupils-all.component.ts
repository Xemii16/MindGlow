import {Component, OnInit} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatList, MatListItem, MatListItemMeta, MatListItemTitle} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {PupilDeleteConfirmComponent} from "./pupil-delete-confirm/pupil-delete-confirm.component";

@Component({
  selector: 'app-pupils-all',
  standalone: true,
  imports: [
    MatDivider,
    MatCheckbox,
    MatButton,
    MatFormField,
    MatIcon,
    MatLabel,
    MatListItemMeta,
    MatPrefix,
    MatInput,
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
  hasNext: boolean = false;
  currentPage: number = 0;
  startWith: FormControl = new FormControl('');

  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getPupils();
    /*this.userService.getUserByToken().then(user => {
      if (user == null) return;
      this.user = user;
    });*/
  }

  reloadPages() {
    this.currentPage = 0;
    /*this.pupils = [];*/
    this.getPupils();
  }

  loadMore() {
    if (!this.hasNext) return;
    this.getPupils();
  }

  openDialog(id: string) {
    const dialogRef = this.dialog.open(PupilDeleteConfirmComponent, {
      data: {
        user: {
          id: id
        }
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.reloadPages();
    });
  }

  private getPupils() {
    if (this.startWith.value === '') {
      /*this.userService.getPupilsWithPagination(true, this.currentPage).then((response) => {
        this.currentPage++;
        this.hasNext = response?.hasNext ?? false;
        if (response === null) return;
        this.pupils.push(...response.users);
      });*/
    } else {
      /*this.userService.getPupilsWithPaginationAndStartWith(true, this.startWith.value, this.currentPage).then((response) => {
        this.currentPage++;
        this.hasNext = response?.hasNext ?? false;
        if (response === null) return;
        this.pupils.push(...response.users);
      });*/
    }
  }
}
