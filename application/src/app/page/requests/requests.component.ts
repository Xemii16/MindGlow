import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientUserService} from "../../services/user/http-client-user.service";
import {User} from "../../services/user/user";
import {MatIcon} from "@angular/material/icon";
import {MatActionList, MatListItem, MatListItemLine, MatListItemTitle} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
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
    MatDivider,
    MatCheckbox,
    MatButton,
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
  users: User[] = [];

  constructor(
    private userService: HttpClientUserService,
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getAllUsers("all").then((res) => {
      this.users = res.filter((user: User) => !user.enabled);
    })
  }
}
