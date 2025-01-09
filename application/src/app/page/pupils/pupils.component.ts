import {Component, OnInit} from '@angular/core';
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {HttpClientUserService} from "../../services/user/http-client-user.service";
import {User} from "../../services/user/user";

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
  user: User | null = null;

  constructor(
    private router: Router,
    private userService: HttpClientUserService
  ) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().then(user => {
      if (user === null) return;
      this.user = user;
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
