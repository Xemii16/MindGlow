import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordDialogComponent} from "./change-password-dialog/change-password-dialog.component";
import {HttpClientUserService} from "../../services/user/http-client-user.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    NgOptimizedImage,
    RouterOutlet,
    RouterLink,
    NgIf,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
  ]
})
export class NavigationComponent implements OnInit {
  availableNavigationList: AvailableNavigationList = {
    teachers: false,
    pupils: false,
    requests: false
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: HttpClientUserService
  ) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().then(user => {
      if (user.role === 'ADMIN') {
        this.availableNavigationList.teachers = true;
        this.availableNavigationList.requests = true;
        this.availableNavigationList.pupils = true;
      }
      if (user.role === 'TEACHER') {
        this.availableNavigationList.pupils = true;
      }
    });
  }

  isCurrentRoute(route: string): boolean {
    if (route.endsWith('/**')) {
      return this.router.url.startsWith(route.replace('/**', ''));
    }
    return this.router.url === route;
  }

  logout() {
    this.router.navigate(['/login']);
  }

  openDialog() {
    this.dialog.open(ChangePasswordDialogComponent)
  }
}

export interface AvailableNavigationList {
  teachers: boolean,
  pupils: boolean,
  requests: boolean
}
