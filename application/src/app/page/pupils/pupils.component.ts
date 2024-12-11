import {Component, OnInit} from '@angular/core';
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {UserService} from "../../service/user/user.service";
import {UserResponse} from "../../service/user/response/user.response";

@Component({
  selector: 'app-pupils',
  standalone: true,
  imports: [
    MatTabNav,
    MatTabNavPanel,
    MatTabLink,
    RouterLink,
    RouterOutlet,
    NgIf
  ],
  templateUrl: './pupils.component.html',
  styleUrl: './pupils.component.scss'
})
export class PupilsComponent implements OnInit {
  user?: UserResponse

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.getUserByToken().then(response => {
      if (response === null) return;
      this.user = response;
    })
  }

  isCurrentRoute(route: string): boolean {
    if (route.endsWith('/**')) {
      return this.router.url.startsWith(route.replace('/**', ''));
    }
    return this.router.url === route;
  }

  route() {
    this.router.navigate(['dashboard', 'pupils'])
  }
}
