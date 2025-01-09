import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientUserService} from "../../services/user/http-client-user.service";
import {User} from "../../services/user/user";
import {MatIcon} from "@angular/material/icon";
import {MatActionList, MatListItem, MatListItemLine, MatListItemTitle} from "@angular/material/list";
import {MatFormField} from "@angular/material/form-field";
import {MatDivider} from "@angular/material/divider";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatIcon,
    MatListItemLine,
    MatListItemTitle,
    MatActionList,
    MatFormField,
    MatDivider,
    MatCheckbox,
    MatButton,
    MatInput,
    RouterLink,
    MatListItem,
    NgIf,
    NgForOf
  ],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent implements OnInit {

  hasNext: boolean = true;
  currentPage: number = 0;
  startWith: FormControl = new FormControl('');
  users: User[] | null = null;

  constructor(
    private userService: HttpClientUserService,
  ) {

  }

  ngOnInit(): void {
    this.getUsers();
  }

  reloadPages() {
    this.currentPage = 0;
    this.getUsers();
  }

  loadMore() {
    if (!this.hasNext) return;
    this.getUsers();
  }

  private getUsers() {
    this.userService.getAllUsers("PUPIL").then((res) => {
      if (res != null) {
        this.users = res.filter((user: User) => user.locked);
      }
    })
  }
}
